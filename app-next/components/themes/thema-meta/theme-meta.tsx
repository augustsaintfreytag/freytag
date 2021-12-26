import { FunctionComponent } from "react"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import Meta, { Props as MetaTagsProps } from "~/components/meta/meta-tags"
import { lines } from "~/utils/description/functions/lines"
import { URL } from "~/utils/routing/library/url"

interface Props {
	previewAsset?: URL
}

function title(): string {
	return pageTitle("Themes")
}

function description(): string {
	return lines(
		"Diverse colour themes, each designed and compiled from an assortment of ten base colours,",
		"distinct palettes, available in light and dark variants.",
		"Supporting Xcode, Visual Studio Code, and other formats."
	)
}

function metaProps(props: Props): MetaTagsProps {
	return {
		href: canonicalHref("/themes"),
		title: title(),
		description: description(),
		coverAsset: props.previewAsset
	}
}

const ThemeMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default ThemeMeta
