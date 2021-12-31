import { FunctionComponent } from "react"
import Markdown from "~/components/markdown/markdown"
import Typo from "~/components/typo/typo"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./themes-title.module.sass"

// Component

interface Props extends PropsWithClassName {}

const ThemesTitle: FunctionComponent<Props> = props => {
	return (
		<section className={className(props.className, styles.block)}>
			<header>
				<h1>
					<Typo>Themes</Typo>
				</h1>
			</header>
			<main>
				<div className={styles.abstract}>
					<Markdown>
						Explore a varied collection of colour themes with light and dark variants. Find a distinct colour palette to match your preference,
						environment, and mood. Packages available for popular editors and development environments.
					</Markdown>
				</div>
			</main>
		</section>
	)
}

export default ThemesTitle
