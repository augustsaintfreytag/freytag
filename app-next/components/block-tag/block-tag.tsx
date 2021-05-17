import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./block-tag.module.sass"

type Props = PropsWithClassName & { name: string; representation?: string }

const BlockTag: FunctionComponent<Props> = props => (
	<div className={className(className(styles.tag, props.className))} data-tag-representation={props.representation}>
		{props.name}
	</div>
)

export default BlockTag
