import { FunctionComponent } from "react"
import { headerText } from "~/utils/brand/functions/brand-text"
import { className } from "~/utils/class-names/class-name"
import styles from "./index-cover.module.sass"

const { title: titleText, descriptor: descriptorText } = headerText()

const IndexCover: FunctionComponent = () => (
	<section className={styles.cover}>
		<div className={className(styles.heading, styles.centered)}>
			<h1>{titleText}</h1>
		</div>
		<div className={className(styles.subheading, styles.centered)}>
			<h2>{descriptorText}</h2>
		</div>
		<img src="/assets/paper-title-cover.jpg" />
	</section>
)

export default IndexCover
