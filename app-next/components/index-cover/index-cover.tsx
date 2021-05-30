import { FunctionComponent } from "react"
import { brandDescriptorFragment, brandTitleFragment } from "~/components/brand/brand-text"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./index-cover.module.sass"

type Props = {
	src?: URL
}

const IndexCover: FunctionComponent<Props> = props => (
	<section className={styles.cover}>
		<div className={className(styles.heading, styles.centered)}>
			<h1>{brandTitleFragment()}</h1>
		</div>
		<div className={className(styles.subheading, styles.centered)}>
			<h2>{brandDescriptorFragment()}</h2>
		</div>
		<img src={props.src ?? "/assets/image-fallback.png"} />
	</section>
)

export default IndexCover
