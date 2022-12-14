import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./input-enclosure.module.sass"

export interface Props extends PropsWithClassName {
	name: string
	context?: string
	children: React.ReactNode
}

const InputEnclosure: FunctionComponent<Props> = props => (
	<div className={className(styles.block, props.className)}>
		{props.children}
		<label htmlFor={props.name}>
			<span className={styles.name}>{props.name}</span>
			{props.context && (
				<>
					<span> — </span>
					<span className={styles.context}>{props.context}</span>
				</>
			)}
		</label>
	</div>
)

export default InputEnclosure
