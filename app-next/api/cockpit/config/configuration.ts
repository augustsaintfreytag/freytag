import { Address, addressRegister, APIToken, Context, Protocol } from "cockpit-access"
import { appEnvironmentIsDevelopment, cockpitToken, internalCockpitPath, publicCockpitPath } from "~/utils/app/app"
import { AppConfigurationError } from "~/utils/app/app-configuration-error"
import { URL } from "~/utils/routing/library/url"

// Functions

function isServerSideContext(context?: Context): boolean {
	if (context === undefined) {
		return typeof window === "undefined"
	}

	return context === Context.Server
}

function pathComponents(path: string): [string, string] {
	const splitIndex = path.indexOf("://")
	const protocol = path.substring(0, splitIndex)
	const host = path.substring(splitIndex + 3)

	return [protocol, host]
}

function existingClientProtocol(): string | undefined {
	if (typeof window === "undefined" || !window.location.protocol) {
		return undefined
	}

	const clientSideProtocolString = window.location.protocol
	if (!clientSideProtocolString.includes("https")) {
		return "http"
	}

	return "https"
}

// Execution

const internalPath = internalCockpitPath()
const publicPath = publicCockpitPath()
const token = cockpitToken()

if (!internalPath || !publicPath || !token) {
	throw new AppConfigurationError(`Missing cockpit access parameters from environment, protocol, host or token not defined.`)
}

const [publicProtocol, publicHost] = pathComponents(publicPath)
const [internalProtocol, internalHost] = pathComponents(internalPath)

const defaultAddress: Address = {
	protocol: (context?: Context): Protocol => {
		if (isServerSideContext(context)) {
			return internalProtocol
		}

		return existingClientProtocol() ?? publicProtocol
	},
	host: (context?: Context): URL => {
		if (isServerSideContext(context)) {
			return internalHost
		}

		return publicHost
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
