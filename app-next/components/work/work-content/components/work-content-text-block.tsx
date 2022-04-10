import { FunctionComponent } from "react"
import TextBlock from "~/components/text-block/text-block"
import { PropsWithAnyTextChildren } from "~/types/props"
import styles from "./work-content-text-block.module.sass"

export interface Props extends PropsWithAnyTextChildren {
	text?: string
}

const WorkContentTextBlock: FunctionComponent<Props> = props => (
	<TextBlock className={styles.block} text={props.text}>
		{props.children}
	</TextBlock>
)

export default WorkContentTextBlock
