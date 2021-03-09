import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import { FunctionComponent } from "react"
import styles from "./default-layout.module.sass"

const DefaultLayout: FunctionComponent = ({ children }) => (
	<section className={styles.layout}>
		<Header />
		<main>{children}</main>
		<Footer />
	</section>
)

export default DefaultLayout
