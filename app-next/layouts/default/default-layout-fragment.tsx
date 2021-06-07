import Head from "next/head"
import { useRouter } from "next/router"
import { FunctionComponent } from "react"
import { brandTitle } from "~/components/brand/brand-text"
import Footer from "~/components/footer/footer"
import Header from "~/components/header/header"
import { PropsWithAnyChildren } from "~/types/props"
import { useSensitiveDataDisplay } from "~/utils/render/sensitive-data-hook"

type Props = PropsWithAnyChildren & {
	showsBrand?: boolean
}

const DefaultLayoutFragment: FunctionComponent<Props> = props => {
	const router = useRouter()
	const shouldDisplaySensitiveData = useSensitiveDataDisplay()

	return (
		<>
			<Head>
				<meta name="application-name" content={brandTitle()} />
				<meta name="author" content={brandTitle()} />
				<meta
					name="description"
					content="Folio site of August Saint Freytag, concept and experience designer, video and story artist. Life events, work showcases, features."
				/>
				<meta name="viewport" content="width=device-width, viewport-fit=cover" />
			</Head>
			<Header showsBrand={props.showsBrand ?? false} activeRoute={router.route} />
			<main>{props.children}</main>
			<Footer activeRoute={router.route} decoded={shouldDisplaySensitiveData} />
		</>
	)
}

export default DefaultLayoutFragment
