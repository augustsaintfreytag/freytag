import { FunctionComponent } from "react"
import ImageCover from "~/components/image-cover/image-cover"
import WorkOrientationNotice from "~/components/work/work-orientation-notice/work-orientation-notice"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./work-cover.module.sass"

type Props = PropsWithClassName & {
	image?: URLComponent
}

const WorkCover: FunctionComponent<Props> = props => {
	return (
		<section className={className(props.className, styles.cover)}>
			<WorkOrientationNotice />
			<ImageCover className={styles.image} src={props.image} />
		</section>
	)
}

export default WorkCover
