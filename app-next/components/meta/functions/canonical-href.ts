import { publicAppPath } from "~/utils/app/app"
import { AppConfigurationError } from "~/utils/app/app-configuration-error"
import { URL } from "~/utils/routing/library/url"

export function canonicalHref(component?: string): URL {
	const basePath = publicAppPath()

	if (!basePath) {
		throw new AppConfigurationError(`Missing public application path for creating canonical path.`)
	}

	if (!component) {
		return basePath
	}

	return `${basePath}/${component}`
}
