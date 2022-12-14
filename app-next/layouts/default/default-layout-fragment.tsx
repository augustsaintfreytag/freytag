import Head from "next/head"
import { useRouter } from "next/router"
import { FunctionComponent } from "react"
import Analytics from "~/components/analytics/analytics"
import Footer from "~/components/footer/footer"
import Header from "~/components/header/header"
import { brandTitle } from "~/components/meta/components/brand-meta-data"
import { PropsWithAnyChildren } from "~/types/props"
import { appEnvironmentIsDevelopment } from "~/utils/app/app"
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
				<meta name="viewport" content="width=device-width, viewport-fit=cover" />
			</Head>
			<Analytics disabled={appEnvironmentIsDevelopment()} />
			<Header showsBrand={props.showsBrand ?? false} activeRoute={router.route} />
			<main>{props.children}</main>
			<Footer activeRoute={router.route} decoded={shouldDisplaySensitiveData} />
		</>
	)
}

export default DefaultLayoutFragment
