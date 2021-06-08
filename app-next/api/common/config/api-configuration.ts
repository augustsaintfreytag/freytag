import { Address, addressRegister, APIToken, Context, Protocol } from "cockpit-access"
import { URL } from "~/utils/routing/library/url"

const protocol = process.env.NEXT_PUBLIC_COCKPIT_PROTOCOL
const hostClient = process.env.NEXT_PUBLIC_COCKPIT_HOST_CLIENT
const hostServer = process.env.NEXT_PUBLIC_COCKPIT_HOST_SERVER
const token = process.env.NEXT_PUBLIC_COCKPIT_ACCESS_TOKEN

if (!protocol || !hostClient || !hostServer || !token) {
	throw new Error(`Missing cockpit access parameters from environment, protocol, host or token not defined.`)
}

function isServerSideContext(context?: Context): boolean {
	if (context === undefined) {
		return typeof window === "undefined"
	}

	return context === Context.Server
}

function clientDependentProtocol(): string | undefined {
	if (typeof window === "undefined" || !window.location.protocol) {
		return undefined
	}

	const clientSideProtocolString = window.location.protocol
	if (!clientSideProtocolString.includes("https")) {
		return "http"
	}

	return "https"
}

const defaultAddress: Address = {
	protocol: (context?: Context): Protocol => {
		if (isServerSideContext(context)) {
			return "http"
		}

		return clientDependentProtocol() || protocol
	},
	host: (context?: Context): URL => {
		if (isServerSideContext(context)) {
			return hostServer
		}

		return hostClient
	},
	token: (): APIToken => {
		return token
	}
}

addressRegister.registerDefault(defaultAddress)

console.log(
	`Registered default address with server-side '${defaultAddress.protocol(Context.Server)}://${defaultAddress.host(
		Context.Server
	)}' and client-side '${defaultAddress.protocol(Context.Client)}://${defaultAddress.host(Context.Client)}'.`
)