import { URL } from "~/utils/urls/library/url"

export function formattedHref(url: URL): string {
	return url.replace(/https?:\/\/(www\.)?/, "")
}
