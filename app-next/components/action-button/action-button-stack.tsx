import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./action-button-stack.module.sass"

interface Props extends PropsWithClassName {}

const ActionButtonStack: FunctionComponent<Props> = props => <div className={className(styles.stack, props.className)}>{props.children}</div>

export default ActionButtonStack
