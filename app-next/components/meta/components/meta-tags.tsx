import Head from "next/head"
import { FunctionComponent } from "react"
import { URL } from "~/utils/routing/library/url"

export enum MetaResourceKind {
	Website = "website",
	Article = "article",
	Music = "music.song",
	Film = "video.movie",
	Video = "video.other"
}

export interface Props {
	title: string
	description?: string
	kind?: MetaResourceKind
	coverImage?: URL
	coverDescription?: string
	href: URL
}

const MetaTags: FunctionComponent<Props> = props => {
	const { title, kind, description, coverImage, href, coverDescription } = props

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:type" content={kind ?? MetaResourceKind.Website} />
			<meta property="og:url" content={href} />
			<meta property="og:description" content={description} />
			{coverImage && <meta property="og:image" content={coverImage} />}
			{coverDescription && <meta property="og:image:alt" content={coverDescription} />}
		</Head>
	)
}

export default MetaTags
