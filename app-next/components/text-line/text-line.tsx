import { FunctionComponent } from "react"
import styles from "./text-line.module.sass"

const TextLine: FunctionComponent = props => <div className={styles.line}>{props.children}</div>

export default TextLine
