export namespace Configuration {

	type APIToken = string
	type URL = string
	type Protocol = string

	export function cmsProtocol(): Protocol {
		return "http"
	}

	export function cmsHost(): URL {
		if (process.server) {
			return "cockpit"
		} else {
			return "cockpit.intra"
		}
	}

	export function cmsToken(): APIToken {
		// TODO: Let configuration tokens be handled by nuxt plugin to be shared (token allows read-only access to data publically available).
		return "c180730444cdd76bd0c2bb676cd7b6"
	}

}