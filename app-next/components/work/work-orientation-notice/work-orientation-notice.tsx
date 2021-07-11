import { FunctionComponent } from "react"
import Sprite from "~/components/sprites/sprite"
import { className } from "~/utils/class-names/class-name"
import styles from "./work-orientation-notice.module.sass"

interface Props {
	showsHighlight?: boolean
}

const WorkOrientationNotice: FunctionComponent<Props> = props => (
	<div className={className(styles.notice, props.showsHighlight && styles.highlighted)}>
		<Sprite className={styles.symbol} href="#Phone Rotation To Portrait Symbol" />
		<div className={styles.message}>Best in landscape.</div>
	</div>
)

export default WorkOrientationNotice
