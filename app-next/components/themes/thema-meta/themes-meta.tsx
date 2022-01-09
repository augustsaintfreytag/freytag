import { FunctionComponent } from "react"
import LinkedMetaTag from "~/components/meta/components/linked-meta-tag"
import { pageTitle } from "~/components/meta/functions/page-title"
import { themeStudioSchema } from "~/components/meta/functions/theme-studio-schema"
import { MetaSocialEmbedKind } from "~/components/meta/library/meta-mark-up"
import Meta, { Props as MetaTagsProps } from "~/components/meta/meta-tags"
import { themeStudioCanonicalHref, themeStudioDescription, themeStudioName } from "~/components/themes/thema-meta/theme-meta-data"
import { URL } from "~/utils/routing/library/url"

interface Props {
	coverAsset?: URL
}

function metaProps(props: Props): MetaTagsProps {
	return {
		href: themeStudioCanonicalHref(),
		title: pageTitle(themeStudioName()),
		description: themeStudioDescription(),
		coverAsset: props.coverAsset,
		socialEmbed: MetaSocialEmbedKind.Cover
	}
}

const ThemesMeta: FunctionComponent<Props> = props => {
	const schema = themeStudioSchema({ coverAsset: props.coverAsset })

	return (
		<>
			<Meta {...metaProps(props)} />
			{<LinkedMetaTag>{JSON.stringify(schema)}</LinkedMetaTag>}
		</>
	)
}

export default ThemesMeta
