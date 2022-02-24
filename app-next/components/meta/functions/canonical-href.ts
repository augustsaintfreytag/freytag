import { appHost, appProtocol } from "~/components/app/app"
import { URL } from "~/utils/routing/library/url"

export function canonicalHref(component?: string): URL {
	return `${appProtocol()}://${appHost()}${component ?? ""}`
}
