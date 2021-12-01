import { FunctionComponent } from "react"
import { UUID } from "~/api/common/library/uuid"
import { Color } from "~/utils/colors/models/color"
import styles from "./theme-preview.module.sass"

export interface Props {
	name: string
	description: string
	colors: Color[]
	link?: {
		id: UUID
		slug?: string
	}
}

const ThemePreview: FunctionComponent<Props> = props => (
	<section className={styles.themePreview}>
		<ol className={styles.colorRow}>
			{props.colors.map((color, index) => {
				const key = `${color.key}-${index}`
				return <li key={key} style={{ backgroundColor: color.rgb }}></li>
			})}
		</ol>
		<h3 className={styles.name}>{props.name}</h3>
		<div className={styles.description}>{props.description}</div>
	</section>
)

export default ThemePreview
