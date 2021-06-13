import Head from "next/head"
import { FunctionComponent } from "react"
import { thumbnailUrlFromComponent } from "~/api/records/asset/functions/image-source-provider"
import { URL } from "~/utils/routing/library/url"

export enum MetaResourceKind {
	Website = "website",
	Article = "article",
	Music = "music.song",
	Film = "video.movie",
	Video = "video.other"
}

export interface Props {
	href: URL
	kind?: MetaResourceKind

	title: string
	description?: string
	coverAsset?: string
	coverDescription?: string

	author?: string
	section?: string
	dateCreated?: Date
	dateModified?: Date
}

const Meta: FunctionComponent<Props> = props => {
	const coverImageUrl = thumbnailUrlFromComponent(props.coverAsset)

	return (
		<Head>
			<title>{props.title}</title>
			<meta name="description" content={props.description} />
			<meta property="og:title" content={props.title} />
			<meta property="og:type" content={props.kind ?? MetaResourceKind.Website} />
			<meta property="og:url" content={props.href} />
			<meta property="og:description" content={props.description} />
			{coverImageUrl && (
				<>
					<meta property="og:image" content={coverImageUrl} />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="600" />
				</>
			)}
			{props.coverDescription && <meta property="og:image:alt" content={props.coverDescription} />}
			{props.author && <meta property="og:article:author" content={props.author} />}
			{props.section && <meta property="og:article:section" content={props.section} />}
			{props.dateCreated && <meta property="og:article:published_time" content={props.dateCreated.toISOString()} />}
			{props.dateModified && <meta property="og:article:modified_time" content={props.dateModified.toISOString()} />}
		</Head>
	)
}

export default Meta
