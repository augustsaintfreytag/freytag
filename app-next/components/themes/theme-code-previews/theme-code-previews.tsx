import { FunctionComponent, useState } from "react"
import ActionButton from "~/components/action-button/action-button"
import { SpriteReference } from "~/components/sprites/sprite"
import { TokenizedString } from "~/components/themes/theme-code-preview/library/tokenized-string"
import ThemeCodePreview from "~/components/themes/theme-code-preview/theme-code-preview"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"
import styles from "./theme-code-previews.module.sass"

export interface CodeContent {
	name: string
	symbol: SpriteReference
	content: TokenizedString
}

interface Props extends PropsWithClassName {
	theme?: IntermediateTheme
	content: CodeContent[]
}

const ThemeCodePreviews: FunctionComponent<Props> = props => {
	const { theme, content } = props
	const [selectedContent, setSelectedContent] = useState<CodeContent | undefined>(content[0])

	return (
		<section className={className(styles.previews, props.className)}>
			<div className={styles.content}>{selectedContent && <ThemeCodePreview theme={theme} content={selectedContent.content} />}</div>
			<div className={styles.selector}>
				{content.map(item => (
					<ActionButton key={item.name} text={item.name} symbol={item.symbol} onClick={() => setSelectedContent(item)} />
				))}
			</div>
		</section>
	)
}

export default ThemeCodePreviews
