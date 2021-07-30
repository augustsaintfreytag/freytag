import { URLComponent } from "~/utils/routing/library/url"

// Convert "Into the Dark" to "into-the-dark"

export function contentAnchorIdFromText(text: string): URLComponent {
	const components = text
		.trim()
		.split(" ")
		.map(component => component.toLowerCase())

	return components.join("-")
}
