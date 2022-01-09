import { FunctionComponent } from "react"
import { datesFromRecord } from "~/api/common/functions/date-conversion"
import { Theme } from "~/api/records/themes/library/theme"
import LinkedMetaTag from "~/components/meta/components/linked-meta-tag"
import { pageTitle } from "~/components/meta/functions/page-title"
import { Props as ThemeSchemaProps, themeSchema } from "~/components/meta/functions/theme-schema"
import { MetaSocialEmbedKind } from "~/components/meta/library/meta-mark-up"
import Meta, { Props as MetaTagsProps } from "~/components/meta/meta-tags"
import { themeCanonicalHref } from "~/components/themes/thema-meta/theme-meta-data"

// Meta Form

function title(theme: Theme): string {
	return `${theme.name} Theme`
}

function themeDescription(description: string): string {
	return description + " " + "Presented by the Theme Studio."
}

function metaProps(theme: Theme): MetaTagsProps {
	return {
		href: themeCanonicalHref(theme._id),
		title: pageTitle(title(theme)),
		description: themeDescription(theme.description),
		coverAsset: theme.cover?.path,
		socialEmbed: MetaSocialEmbedKind.Cover
	}
}

// Schema Form

function schemaProps(theme: Theme): ThemeSchemaProps {
	const { dateCreated, dateModified } = datesFromRecord(theme)

	return {
		id: theme._id,
		nameShort: theme.name,
		nameFull: title(theme),
		author: "August Saint Freytag",
		dateCreated,
		dateModified,
		coverAsset: theme.cover?.path,
		description: themeDescription(theme.description)
	}
}

// Component

interface Props {
	theme: Theme
}

const ThemeMeta: FunctionComponent<Props> = props => {
	const { theme } = props
	const schema = themeSchema(schemaProps(theme))

	return (
		<>
			<Meta {...metaProps(theme)} />
			{<LinkedMetaTag>{JSON.stringify(schema)}</LinkedMetaTag>}
		</>
	)
}

export default ThemeMeta
