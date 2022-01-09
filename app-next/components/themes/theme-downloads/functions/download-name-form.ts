import { URL } from "~/utils/routing/library/url"

export function fileNameFromPath(name: string, href: URL): string {
	const fileEnding = href.match(/\/[a-zA-Z0-9 \-_]+\.(.+)$/)?.[1]
	return `${name}.${fileEnding}`
}
