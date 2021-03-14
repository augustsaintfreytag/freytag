import { NextPage } from "next"
import Link from "next/link"
import { FunctionComponent } from "react"
import Divider from "~/components/divider/divider"
import Now from "~/components/now/now"
import { headerText } from "~/utils/brand/functions/brand-text"
import { className } from "~/utils/class-names/class-name"
import { PropsWithHref, TextFunctionComponent } from "~/utils/framework/library/components"
import styles from "./index.module.sass"

// Decoration Components

const Surpassed: TextFunctionComponent = props => <span className={styles.surpassed}>{props.children}</span>

// Link Components

const IndexLink: FunctionComponent<PropsWithHref> = props => (
	<Link href={props.href}>
		<a>
			<u>{props.href}</u>
		</a>
	</Link>
)

// Cover Component

const { descriptor: descriptorText } = headerText()

const CoverSection: FunctionComponent = () => (
	<section className={styles.cover}>
		<div className={className(styles.heading, styles.centered)}>
			<h1>August Saint Freytag</h1>
		</div>
		<div className={className(styles.subheading, styles.centered)}>
			<h2>{descriptorText}</h2>
		</div>
		<img src="/paper-title-cover.jpg" />
	</section>
)

// Page Component

const IndexPage: NextPage = () => {
	return (
		<section className={styles.page}>
			<CoverSection />
			<section className={styles.texts}>
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
			<section className={styles.feature}>
				<div>(Feature missing)</div>
			</section>
		</section>
	)
}

export default IndexPage
