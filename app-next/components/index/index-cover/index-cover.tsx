import { FunctionComponent } from "react"
import ImageCover from "~/components/image-cover/image-cover"
import { brandDescriptorFragment, brandTitleFragment } from "~/components/meta/components/brand-meta-data"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./index-cover.module.sass"

interface Props {
	src?: URLComponent
}

const IndexCover: FunctionComponent<Props> = props => (
	<section className={styles.cover}>
		<div className={className(styles.headings)}>
			<div className={styles.inlay}>
				<h1>{brandTitleFragment()}</h1>
				<h2>{brandDescriptorFragment()}</h2>
			</div>
		</div>
		<ImageCover className={styles.image} src={props.src} />
	</section>
)

export default IndexCover
