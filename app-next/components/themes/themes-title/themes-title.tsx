import { FunctionComponent } from "react"
import DecoratedInternalLink from "~/components/link/decorated-internal-link"
import { themeStudioIntroduction } from "~/components/themes/thema-meta/theme-meta-data"
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
					<p>{themeStudioIntroduction()}</p>
				</div>
				<div className={styles.links}>
					<DecoratedInternalLink className={styles.link} href="/work/theme-studio" text="What's this?" />
					<DecoratedInternalLink className={styles.link} href="/work/theme-studio#faq" text="Installation" />
					<DecoratedInternalLink className={styles.link} href="/themes/editor" text="Open Editor" />
				</div>
			</main>
		</section>
	)
}

export default ThemesTitle
