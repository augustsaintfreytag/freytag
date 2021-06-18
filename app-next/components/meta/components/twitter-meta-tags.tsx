import Head from "next/head"
import { FunctionComponent } from "react"
import { Dictionary } from "~/utils/types/library/dictionary"
import { MetaSocialEmbedKind } from "../library/meta-mark-up"

export interface Props {
	socialEmbed?: MetaSocialEmbedKind
}

const twitterCardByEmbedKind: Dictionary<MetaSocialEmbedKind, string> = {
	[MetaSocialEmbedKind.Default]: "summary",
	[MetaSocialEmbedKind.Cover]: "summary_large_image"
}

const TwitterMeta: FunctionComponent<Props> = props => {
	return (
		<Head>
			<meta name="twitter:card" content={twitterCardByEmbedKind[props.socialEmbed ?? MetaSocialEmbedKind.Default]} />
			<meta name="twitter:site" content="@AugustFreytag" />
			<meta name="twitter:creator" content="@AugustFreytag" />
		</Head>
	)
}

export default TwitterMeta
