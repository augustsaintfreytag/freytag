import "@common/styles/globals/globals.sass"
import type { AppProps as NextAppProps } from "next/app"
import { Fragment, FunctionComponent } from "react"
import "~/api/cockpit/config/configuration"
import CommonSprites from "~/components/sprites/common-sprites"
import type { Page } from "~/types/page"

type AppProps = NextAppProps & {
	Component: Page
}

const App: FunctionComponent<AppProps> = props => {
	const Component = props.Component
	const Layout = Component.layout ?? Fragment

	const pageProps = { router: props.router, ...props.pageProps }

	return (
		<>
			<CommonSprites />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}

export default App
