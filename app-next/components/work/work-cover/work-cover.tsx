import { FunctionComponent } from "react"
import ImageCover from "~/components/image-cover/image-cover"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./work-cover.module.sass"

type Props = PropsWithClassName & {
	image?: URLComponent
}

const WorkCover: FunctionComponent<Props> = props => (
	<section className={className(props.className, styles.cover)}>
		<ImageCover src={props.image} />
	</section>
)

export default WorkCover
