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
	title: string
	description?: string
	kind?: MetaResourceKind
	coverAsset?: string
	coverDescription?: string
}

const Meta: FunctionComponent<Props> = props => {
	const { title, kind, description, coverAsset, href, coverDescription } = props
	const coverImageUrl = thumbnailUrlFromComponent(coverAsset)

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:type" content={kind ?? MetaResourceKind.Website} />
			<meta property="og:url" content={href} />
			<meta property="og:description" content={description} />
			{coverImageUrl && (
				<>
					<meta property="og:image" content={coverImageUrl} />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="600" />
				</>
			)}
			{coverDescription && <meta property="og:image:alt" content={coverDescription} />}
		</Head>
	)
}

export default Meta
