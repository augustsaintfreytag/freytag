import { MetaTag } from "./library/meta-tag"
import { Dictionary } from "../library/dictionary"

export namespace Head {

	type HeadDictionary = Dictionary<any>

	// Constant Properties

	export const separator = " / "

	export const htmlAttrs = { lang: "en" }
	export const title = "August Saint Freytag"
	export const meta: MetaTag[] = [
		{hid: "encoding", charset: "utf-8"},
		{hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1.0"},
		{hid: "author", name: "author", content: "August Saint Freytag"},
		{hid: "copyright", name: "copyright", content: "August Saint Freytag"},
		{hid: "robots", name: "robots", content: "follow"},
		{hid: "favicon", rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico"}
	]

	// Modeling

	export function modeled(include?: HeadDictionary|undefined): HeadDictionary {
		const base = {htmlAttrs, title, meta}

		if (!include) {
			return base
		}

		for (const includeKey in include) {
			const inclusion = include[includeKey]

			if (inclusion instanceof Array) {
				if(base[includeKey] instanceof Array === false) {
					continue
				}

				if (!base[includeKey]) {
					base[includeKey] = []
				}

				base[includeKey]!.push(...inclusion)
				continue
			}

			base[includeKey] = inclusion
		}

		return base
	}

	// Element Form

	export namespace Form {

		export function suffixedTitle(primaryTitle: string, titles: string[] = []): string {
			return [primaryTitle, ...titles, title].join(separator)
		}

	}

}