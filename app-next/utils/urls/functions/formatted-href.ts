import { URL } from "~/utils/urls/library/url"

export function formattedHref(url: URL): string {
	return url.replace(/https?:\/\/(www\.)?/, "")
}

export function isExternalHref(url: URL): boolean {
	return url.includes("http")
}

export function hrefProperties(url: URL): { href: URL; text: string; isExternal: boolean } {
	return {
		href: url,
		text: formattedHref(url),
		isExternal: isExternalHref(url),
	}
}
