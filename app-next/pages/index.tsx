import Head from "next/head"
import Link from "next/link"
import { FunctionComponent } from "react"
import Divider from "~/components/divider/divider"
import IndexCover from "~/components/index-cover/index-cover"
import Now from "~/components/now/now"
import LandingLayout from "~/layouts/default/landing-layout"
import { Page } from "~/types/page"
import { PropsWithHref } from "~/types/props"
import { brandTitleText } from "~/utils/brand/functions/brand-text"
import styles from "./index-page.module.sass"

// Link Components

const IndexLink: FunctionComponent<PropsWithHref> = props => (
	<Link href={props.href}>
		<a>
			<u>{props.href}</u>
		</a>
	</Link>
)

// Page Component

const IndexPage: Page = () => {
	return (
		<>
			<Head>
				<title>{brandTitleText}</title>
			</Head>
			<section className={styles.page}>
				<IndexCover />
				<section className={styles.texts}>
					<div className={styles.line}>My name is August Saint Freytag.</div>
					<div className={styles.line}>
						The renaissance is <Now />.
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
		</>
	)
}

IndexPage.layout = LandingLayout

export default IndexPage
