import { FunctionComponent } from "react"
import ThemeTag, { Props as ThemeTagProps } from "~/components/themes/theme-tag/components/theme-tag"
import Typo from "~/components/typo/typo"
import { Color } from "~/utils/colors/models/color"
import { UUID } from "~/utils/uuid/uuid"
import styles from "./theme-preview.module.sass"

export interface Props {
	name: string
	description: string
	colors: Color[]
	tags: ThemeTagProps[]
	link: {
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
		<header>
			<h3 className={styles.name}>
				<Typo>{props.name}</Typo>
			</h3>
			<div className={styles.tags}>
				{props.tags.map(tag => (
					<ThemeTag key={tag.name} name={tag.name} symbol={tag.symbol} />
				))}
			</div>
		</header>
		<div className={styles.description}>
			<Typo>{props.description}</Typo>
		</div>
	</section>
)

export default ThemePreview
