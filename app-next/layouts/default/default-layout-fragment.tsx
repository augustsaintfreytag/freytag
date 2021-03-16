import Head from "next/head"
import { FunctionComponent } from "react"
import Footer from "~/components/footer/footer"
import Header from "~/components/header/header"
import { PropsWithAnyChildren } from "~/types/props"
import { brandTitleText } from "~/utils/brand/functions/brand-text"

type Props = PropsWithAnyChildren & {
	showsBrand?: boolean
}

const DefaultLayoutFragment: FunctionComponent<Props> = props => {
	return (
		<>
			<Head>
				<meta name="application-name" content={brandTitleText} />
				<meta name="author" content={brandTitleText} />
				<meta
					name="description"
					content="Folio site of August Saint Freytag, concept and experience designer, video and story artist. Life events, work showcases, features."
				/>
			</Head>
			<Header showsBrand={props.showsBrand ?? false} />
			<main>{props.children}</main>
			<Footer />
		</>
	)
}

export default DefaultLayoutFragment
