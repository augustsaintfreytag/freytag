import DefaultLayout from "@/layouts/default-layout"
import "@/styles/base/globals.sass"
import type { AppProps } from "next/app"
import type { FunctionComponent } from "react"

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
	<DefaultLayout>
		<Component {...pageProps} />
	</DefaultLayout>
)

export default App
