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
		// TODO: Let configuration tokens be handled by nuxt plugin to be shared (token allows read-only access to data publically available).
		return "c180730444cdd76bd0c2bb676cd7b6"
	}

	// Context

	private requestedContext(context?: Configuration.Context) {
		if (context === undefined) {
			return process.server ? Configuration.Context.Server : Configuration.Context.Client
		}

		return context
	}

}