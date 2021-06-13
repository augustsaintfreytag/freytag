import { joinedPageTitle } from "../functions/page-title"

// Title

export function brandTitle(): string {
	return "August Saint Freytag"
}

export function brandTitleFragment(): JSX.Element {
	return <>August Saint Freytag</>
}

export function indexBrandTitle(): string {
	return joinedPageTitle(`${brandTitle()} / Personal Folio`)
}

// Descriptor

export function brandDescriptor(): string {
	return "Concept and Experience Designer, Video and Story Artist"
}

export function brandDescriptorFragment(): JSX.Element {
	return <>Concept&nbsp;and&nbsp;Experience Designer, Video&nbsp;and&nbsp;Story&nbsp;Artist</>
}
