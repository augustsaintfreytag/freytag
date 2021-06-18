import Head from "next/head"
import { FunctionComponent } from "react"

const LinkedMetaTag: FunctionComponent<{ children: string }> = props => {
	const contents = { __html: props.children }

	return (
		<Head>
			<script type="application/ld+json" id="json-ld-data" dangerouslySetInnerHTML={contents}></script>
		</Head>
	)
}

export default LinkedMetaTag
