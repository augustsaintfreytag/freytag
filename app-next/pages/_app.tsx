import type { AppProps } from "next/app"
import { FunctionComponent } from "react"
import Sprites from "~/components/sprites/sprites"
import DefaultLayout from "~/layouts/default/default-layout"
import "~/styles/base/globals.sass"

function isLandingPageRoute(route: string): boolean {
	return route === "/"
}

const App: FunctionComponent<AppProps> = props => {
	const { Component, pageProps, router } = props

	return (
		<DefaultLayout showsBrand={!isLandingPageRoute(router.route)}>
			<Sprites />
			<Component {...pageProps} />
		</DefaultLayout>
	)
}

export default App
