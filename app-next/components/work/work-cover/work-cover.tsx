import { FunctionComponent } from "react"
import ImageCover from "~/components/image-cover/image-cover"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./work-cover.module.sass"

type Props = PropsWithClassName & {
	image?: URLComponent
}

const WorkCover: FunctionComponent<Props> = props => (
	<section className={className(props.className, styles.cover)}>
		<div className={styles.orientationNotice}>
			<Sprite className={styles.symbol} href="#Phone Rotation To Portrait Symbol" />
			<div className={styles.message}>Best in landscape.</div>
		</div>
		<ImageCover className={styles.image} src={props.image} />
	</section>
)

export default WorkCover
