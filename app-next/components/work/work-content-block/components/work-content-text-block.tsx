import { FunctionComponent } from "react"
import Markdown from "~/components/markdown/markdown"
import { PropsWithAnyChildren } from "~/types/props"
import styles from "./work-content-text-block.module.sass"

export interface Props extends PropsWithAnyChildren {
	text?: string
}

const WorkContentTextBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		{props.text && <Markdown>{props.text}</Markdown>}
		{props.children && props.children}
	</section>
)

export default WorkContentTextBlock
