import { URL } from "~/utils/routing/library/url"

export interface HrefProperties {
	href: URL
	text: string
	isExternal: boolean
}

export function formattedHref(url: URL): string {
	return url.replace(/https?:\/\/(www\.)?/, "")
}

export function isExternalHref(url: URL): boolean {
	return url.includes("http")
}

export function hrefProperties(url: URL): HrefProperties {
	return {
		href: url,
		text: formattedHref(url),
		isExternal: isExternalHref(url)
	}
}
