import { URL } from "@/modules/common/library/url"
import { APIToken, Connection, Context, Environment, Protocol } from "./cockpit-configuration"

export class CockpitConnection implements Connection {

	private environment: Environment
	private accessToken: APIToken|undefined

	constructor() {
		if (process.env["NUXT_ENV_APP_ENVIRONMENT"] === Environment.Live) {
			this.environment = Environment.Live
		} else {
			this.environment = Environment.Development
		}

		this.accessToken = process.env["NUXT_ENV_COCKPIT_ACCESS_TOKEN"]
	}

	// Parameters

	protocol(context?: Context): Protocol {
		if (this.requestedContext(context) === Context.Server) {
			return "http"
		}

		return "https"
	}

	host(context?: Context): URL {
		if (this.requestedContext(context) === Context.Server) {
			return "cockpit"
		}

		if (this.environment === Environment.Live) {
			return "cockpit.augustfreytag.com"
		}

		return "cockpit.intra"
	}

	token(): APIToken {
		if (!this.accessToken) {
			console.error("Access token for cockpit access is not defined in environment.")
			return ""
		}

		return this.accessToken

	}

	// Context

	private requestedContext(context?: Context) {
		if (context === undefined) {
			return process.server ? Context.Server : Context.Client
		}

		return context
	}

}