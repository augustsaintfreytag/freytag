import { FunctionComponent } from "react"
import Typo from "~/components/typo/typo"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./theme-editor-title.module.sass"

interface Props extends PropsWithClassName {}

const ThemeEditorTitle: FunctionComponent<Props> = props => (
	<section className={className(styles.block, props.className)}>
		<h1>
			<Typo>Theme Editor</Typo>
		</h1>
		<div className={styles.abstract}>
			<p>
				Create your own themes in the Editor using a collection of base colours. Preview your work in progress with code samples, make adjustments and
				see generated results in real-time. Submit your creation to the gallery.
			</p>
		</div>
	</section>
)

export default ThemeEditorTitle
