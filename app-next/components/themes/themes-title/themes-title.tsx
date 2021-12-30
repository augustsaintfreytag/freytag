import { FunctionComponent } from "react"
import Markdown from "~/components/markdown/markdown"
import Typo from "~/components/typo/typo"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./themes-title.module.sass"

// Component

interface Props extends PropsWithClassName {
	title: string
	abstract: string
}

const ThemesTitle: FunctionComponent<Props> = props => {
	const { title, abstract } = props

	return (
		<section className={className(props.className, styles.block)}>
			<header>
				<h1>
					<Typo>{title}</Typo>
				</h1>
			</header>
			<main>
				<div className={styles.abstract}>
					<Markdown>{abstract}</Markdown>
				</div>
			</main>
		</section>
	)
}

export default ThemesTitle
