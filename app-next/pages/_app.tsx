import Sprites from "@/components/sprites/sprites"
import DefaultLayout from "@/layouts/default/default-layout"
import "@/styles/base/globals.sass"
import type { AppProps } from "next/app"
import type { FunctionComponent } from "react"

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
	<DefaultLayout>
		<Sprites />
		<Component {...pageProps} />
	</DefaultLayout>
)

export default App
