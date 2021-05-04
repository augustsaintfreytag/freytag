import type { AppProps as NextAppProps } from "next/app"
import { Fragment, FunctionComponent } from "react"
import Sprites from "~/components/sprites/sprites"
import "~/styles/base/globals.sass"
import type { Page } from "~/types/page"
import "~/utils/api/common/config/api-configuration"

type AppProps = NextAppProps & {
	Component: Page
}

const App: FunctionComponent<AppProps> = props => {
	const Component = props.Component
	const Layout = Component.layout ?? Fragment

	const pageProps = { router: props.router, ...props.pageProps }

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
