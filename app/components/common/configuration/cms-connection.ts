import { Url } from "../library/url"
import { Configuration } from "./configuration"

export class CmsConnection implements Configuration.Connection {

	private environment: Configuration.Environment
	private accessToken: Configuration.ApiToken|undefined

	constructor() {
		if (process.env["NUXT_ENV_APP_ENVIRONMENT"] === "LIVE") {
			this.environment = Configuration.Environment.Live
		} else {
			this.environment = Configuration.Environment.Development
		}

		this.accessToken = process.env["NUXT_ENV_COCKPIT_ACCESS_TOKEN"]
	}

	// Parameters

	protocol(context?: Configuration.Context): Configuration.Protocol {
		if (this.requestedContext(context) === Configuration.Context.Server) {
			return "http"
		}

		return "https"
	}

	host(context?: Configuration.Context): Url {
		if (this.requestedContext(context) === Configuration.Context.Server) {
			return "cockpit"
		}

		if (this.environment === Configuration.Environment.Live) {
			return "cockpit.augustfreytag.com"
		}

		return "cockpit.intra"
	}

	token(): Configuration.ApiToken {
		if (!this.accessToken) {
			console.error("Access token for cockpit access is not defined in environment.")
			return ""
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