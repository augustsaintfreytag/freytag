import type { AppProps as NextAppProps } from "next/app"
import { Fragment, FunctionComponent } from "react"
import Sprites from "~/components/sprites/sprites"
import "~/styles/base/globals.sass"
import { Page } from "~/types/page"

type AppProps = NextAppProps & {
	Component: Page
}

const App: FunctionComponent<AppProps> = props => {
	const { Component, pageProps, router } = props
	const Layout = Component.layout ?? Fragment

	return (
		<>
			<Sprites />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}

export default App
