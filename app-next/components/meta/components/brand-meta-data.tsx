// Title

export function authorTitle(): string {
	return "August Saint Freytag"
}

export function brandTitle(): string {
	return authorTitle()
}

export function brandTitleFragment(): JSX.Element {
	return <>August Saint Freytag</>
}

export function indexBrandTitle(): string {
	return `${brandTitle()} / Personal Folio`
}

// Descriptor

export function brandDescriptor(): string {
	return "Concept and Experience Designer, Video and Story Artist"
}

export function brandDescriptorFragment(): JSX.Element {
	return <>Concept&nbsp;and Experience&nbsp;Designer, Video&nbsp;and&nbsp;Story&nbsp;Artist</>
}
