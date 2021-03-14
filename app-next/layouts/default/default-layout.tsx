import { FunctionComponent } from "react"
import Footer from "~/components/footer/footer"
import Header from "~/components/header/header"
import styles from "./default-layout.module.sass"

type Props = {
	showsBrand?: boolean
}

const DefaultLayout: FunctionComponent<Props> = props => (
	<section className={styles.layout}>
		<Header showsBrand={props.showsBrand ?? true} />
		<main>{props.children}</main>
		<Footer />
	</section>
)

export default DefaultLayout
