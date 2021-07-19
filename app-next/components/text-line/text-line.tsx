import { FunctionComponent } from "react"
import Typo from "~/components/typo/typo"
import { PropsWithAnyChildren } from "~/types/props"
import styles from "./text-line.module.sass"

const TextLine: FunctionComponent<PropsWithAnyChildren> = props => (
	<div className={styles.line}>
		<Typo>{props.children}</Typo>
	</div>
)

export default TextLine
