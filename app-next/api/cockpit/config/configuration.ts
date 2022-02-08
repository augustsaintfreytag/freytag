import { Address, addressRegister, APIToken, Context, Protocol } from "cockpit-access"
import { appEnvironmentIsDevelopment, cockpitHostClient, cockpitHostServer, cockpitProtocol, cockpitToken } from "~/components/meta/library/app"
import { URL } from "~/utils/routing/library/url"

const protocol = cockpitProtocol()
const hostClient = cockpitHostClient()
const hostServer = cockpitHostServer()
const token = cockpitToken()

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

if (appEnvironmentIsDevelopment()) {
	console.log(
		`Registered default address with server-side '${defaultAddress.protocol(Context.Server)}://${defaultAddress.host(
			Context.Server
		)}' and client-side '${defaultAddress.protocol(Context.Client)}://${defaultAddress.host(Context.Client)}'.`
	)
}
