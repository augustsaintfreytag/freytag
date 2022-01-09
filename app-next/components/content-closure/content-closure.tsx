import { FunctionComponent } from "react"
import { PropsWithAnyChildren, PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./content-closure.module.sass"

interface Props extends PropsWithClassName, PropsWithAnyChildren {}

const ContentClosure: FunctionComponent<Props> = props => {
	return <aside className={className(styles.closure, props.className)}>{props.children}</aside>
}

export default ContentClosure
