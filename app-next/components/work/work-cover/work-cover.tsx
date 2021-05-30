import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-cover.module.sass"

type Props = PropsWithClassName & {
	image: URL
}

const WorkCover: FunctionComponent<Props> = props => (
	<section className={className(props.className, styles.cover)}>
		<img src={props.image} />
	</section>
)

export default WorkCover
