import type { AppProps } from "next/app"
import { FunctionComponent } from "react"
import "../styles/base/globals.sass"

const App: FunctionComponent<AppProps> = props => {
	const Component = props.Component
	const pageProps = props.pageProps

	return (
		<Component {...pageProps} />
	)
}

export default App