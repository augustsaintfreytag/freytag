import { Url } from "../library/url"
import { Configuration } from "./configuration"

export class CmsConnection implements Configuration.Connection {

	// Parameters

	protocol(): Configuration.Protocol {
		return "http"
	}

	host(context?: Configuration.Context): Url {
		if (this.requestedContext(context) === Configuration.Context.Server) {
			return "cockpit"
		} else {
			return "cockpit.intra"
		}
	}

	token(): Configuration.ApiToken {
		const token = process.env["NUXT_ENV_COCKPIT_ACCESS_TOKEN"]
		if (!token) {
			throw new TypeError(`Access token for cockpit access is not defined in environment.`)
		}

		return token

	}

	// Context

	private requestedContext(context?: Configuration.Context) {
		if (context === undefined) {
			return process.server ? Configuration.Context.Server : Configuration.Context.Client
		}

		return context
	}

}