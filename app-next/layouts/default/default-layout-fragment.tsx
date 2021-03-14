import { FunctionComponent } from "react"
import Footer from "~/components/footer/footer"
import Header from "~/components/header/header"
import { PropsWithAnyChildren } from "~/types/props"

type Props = PropsWithAnyChildren & {
	showsBrand?: boolean
}

const DefaultLayoutFragment: FunctionComponent<Props> = props => {
	return (
		<>
			<Header showsBrand={props.showsBrand ?? false} />
			<main>{props.children}</main>
			<Footer />
		</>
	)
}

export default DefaultLayoutFragment
