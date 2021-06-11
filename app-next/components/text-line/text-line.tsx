import { FunctionComponent } from "react"
import { PropsWithAnyChildren } from "~/types/props"
import styles from "./text-line.module.sass"

const TextLine: FunctionComponent<PropsWithAnyChildren> = props => <div className={styles.line}>{props.children}</div>

export default TextLine
