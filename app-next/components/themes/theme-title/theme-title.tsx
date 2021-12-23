import { FunctionComponent } from "react"
import ThemeTag, { Props as ThemeTagProps } from "~/components/themes/theme-tag/components/theme-tag"
import Typo from "~/components/typo/typo"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./theme-title.module.sass"

interface Props extends PropsWithClassName {
	text: string
	tags: ThemeTagProps[]
}

const ThemeTitle: FunctionComponent<Props> = props => {
	const { text, tags } = props

	return (
		<section className={className(styles.block, props.className)}>
			<h1>
				<Typo>{text} Theme</Typo>
			</h1>
			<ul className={styles.tags}>
				{tags.map(tag => (
					<li key={tag.name} className={styles.tag}>
						<ThemeTag key={tag.name} name={tag.name} symbol={tag.symbol} />
					</li>
				))}
			</ul>
		</section>
	)
}

export default ThemeTitle
