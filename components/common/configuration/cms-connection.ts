import { Url } from "../library/url"
import { Configuration } from "./configuration"
import { Environment } from "./environment"

export class CmsConnection implements Configuration.Connection {

	private environment: Environment
	private accessToken: Configuration.ApiToken|undefined

	constructor() {
		if (process.env["NUXT_APP_ENVIRONMENT"] === "LIVE") {
			this.environment = Environment.Live
		} else {
			this.environment = Environment.Development
		}

		this.accessToken = process.env["NUXT_COCKPIT_ACCESS_TOKEN"]
	}

	// Parameters

	protocol(): Configuration.Protocol {
		if (this.environment === Environment.Live) {
			return "https"
		}

		return "http"
	}

	host(context?: Configuration.Context): Url {
		if (this.requestedContext(context) === Configuration.Context.Server) {
			return "cockpit"
		}

		if (this.environment === Environment.Live) {
			return "cockpit.augustfreytag.com"
		}

		return "cockpit.intra"
	}

	token(): Configuration.ApiToken {
		if (!this.accessToken) {
			throw new TypeError(`Access token for cockpit access is not defined in environment.`)
		}

		return this.accessToken

	}

	// Context

	private requestedContext(context?: Configuration.Context) {
		if (context === undefined) {
			return process.server ? Configuration.Context.Server : Configuration.Context.Client
		}

		return context
	}

}