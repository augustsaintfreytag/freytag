import { MetaTag } from "./library/meta-tag"

export namespace Head {

	type HeadDictionary = {[key: string]: string|any[]}

	// Constant Properties

	export const title = "August S. Freytag"
	export const meta: MetaTag[] = [
		{hid: "author", name: "author", content: "August S. Freytag"},
		{hid: "favicon", rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico"}
	]

	// Modeling

	export function modeled(include?: HeadDictionary|undefined): HeadDictionary {
		const base = {title, meta}

		if (!include) {
			return base
		}

		for (const includeKey in include) {
			const inclusion = include[includeKey]

			if (inclusion instanceof Array) {
				if(base[includeKey] instanceof Array === false) {
					continue;
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

		export function suffixedTitle(titleComponents: string|string[]): string {
			if (typeof titleComponents === "string") {
				titleComponents = [titleComponents]
			}

			return [...titleComponents, title].join(" / ")
		}

	}

}