import { URL } from "~/utils/routing/library/url"
import { appHost, appProtocol } from "../library/app"

export function canonicalHref(component?: string): URL {
	return `${appProtocol()}://${appHost()}${component ?? ""}`
}
