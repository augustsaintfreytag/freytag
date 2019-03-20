export namespace Head {

	// Properties

	export const title = "August S. Freytag"
	export const meta = [
		{hid: "author", name: "author", content: "August S. Freytag"},
		{hid: "description", name: "description", content: "Personal portfolio and work showcase site of August S. Freytag, music video artist, filmmaker, concept designer, developer, analogue photographer. Presenting a selection of artwork, concepts, sketches and work in progress."},
		{hid: "favicon", rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico"}
	]

	// Combined

	export const modeled = () => {
		return {title, meta}
	}

}