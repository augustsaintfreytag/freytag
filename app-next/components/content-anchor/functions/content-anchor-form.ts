import { URLComponent } from "~/utils/routing/library/url"

/** Transforms the given text snippet into a identifier usable as a page anchor.
 *  Example: Converts "Into the Dark" to "into-the-dark".
 */
export function contentAnchorIdFromText(text: string): URLComponent {
	const components = text
		.trim()
		.split(" ")
		.map(component => component.toLowerCase())

	return components.join("-")
}
