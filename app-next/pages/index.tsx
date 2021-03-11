import { NextPage } from "next"
import Link from "next/link"
import { FunctionComponent } from "react"
import Divider from "~/components/divider/divider"
import Now from "~/components/now/now"
import { TextFunctionComponent } from "~/utils/framework/library/components"
import styles from "./index.module.sass"

// Decoration Components

const Surpassed: TextFunctionComponent = props => <span className={styles.surpassed}>{props.children}</span>

// Link Components

type IndexLinkProps = {
	href: string
}

const IndexLink: FunctionComponent<IndexLinkProps> = props => (
	<Link href={props.href}>
		<u>{props.href}</u>
	</Link>
)

// Page Component

const IndexPage: NextPage = () => {
	return (
		<section className={styles.page}>
			<div className={styles.line}>My name is August Saint Freytag.</div>
			<div className={styles.line}>
				The renaissance is <Now />
				<Surpassed>next year</Surpassed>.
			</div>
			<Divider />
			<div className={styles.line}>
				List the string of <IndexLink href="/life" /> events until now.
			</div>
			<div className={styles.line}>
				Read and view showcases of <IndexLink href="/work" /> in review.
			</div>
			<div className={styles.line}>As a start, a feature was selected for you.</div>
		</section>
	)
}

export default IndexPage
