import { FunctionComponent } from "react"
import ImageCover from "~/components/image-cover/image-cover"
import { brandDescriptorFragment, brandTitleFragment } from "~/components/meta/components/brand-text"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./index-cover.module.sass"

interface Props {
	src?: URLComponent
}

const IndexCover: FunctionComponent<Props> = props => (
	<section className={styles.cover}>
		<div className={className(styles.heading, styles.centered)}>
			<h1>{brandTitleFragment()}</h1>
		</div>
		<div className={className(styles.subheading, styles.centered)}>
			<h2>{brandDescriptorFragment()}</h2>
		</div>
		<ImageCover className={styles.image} src={props.src} />
	</section>
)

export default IndexCover
