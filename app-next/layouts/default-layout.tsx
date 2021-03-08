import { FunctionComponent } from "react"

const DefaultLayout: FunctionComponent = ({ children }) => (
	<>
		<header>Header</header>
		<main>{children}</main>
		<footer>Footer</footer>
	</>
)

export default DefaultLayout
