import { FunctionComponent } from "react"
import RadioActionButton from "~/components/action-button/radio-action-button"
import { useLocalStorageState } from "~/components/local-storage/functions/local-storage-hook"
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

const selectedContentKey = "theme-code-preview-format"

const ThemeCodePreviews: FunctionComponent<Props> = props => {
	const { theme, content } = props
	const [selectedContentIndex, setSelectedContentIndex] = useLocalStorageState<number>(selectedContentKey, 0)
	const selectedContent = content[selectedContentIndex]

	return (
		<section className={className(styles.previews, props.className)}>
			<div className={styles.content}>{selectedContent && <ThemeCodePreview theme={theme} content={selectedContent.content} />}</div>
			<div className={styles.selector}>
				{content.map((item, index) => (
					<RadioActionButton
						key={item.name}
						text={item.name}
						title={`View theme preview for ${item.name}`}
						symbol={item.symbol}
						active={index === selectedContentIndex}
						onClick={() => setSelectedContentIndex(index)}
					/>
				))}
			</div>
		</section>
	)
}

export default ThemeCodePreviews
