import { CSSProperties, FunctionComponent } from "react"
import FauxWindow from "~/components/faux-window/faux-window"
import { tokenizedStringByLines } from "~/components/themes/theme-code-preview/functions/tokenized-string-line-split"
import { swiftTokenizedString } from "~/components/themes/theme-code-preview/functions/tokenized-string-presets"
import { colorFromIntermediateTheme, ThemeFormatKey } from "~/components/themes/theme-code-preview/library/theme-format-key"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"
import styles from "./theme-code-preview.module.sass"

interface Props extends PropsWithClassName {
	theme?: IntermediateTheme
}

const ThemeCodePreview: FunctionComponent<Props> = props => {
	const theme = props.theme
	const tokenizedString = swiftTokenizedString()
	const tokensByLine = tokenizedStringByLines(tokenizedString)

	const numberOfLines = tokensByLine.length
	const lineNumberPadding = String(numberOfLines).length
	const formattedLineIndex = (lineIndex: number) => String(lineIndex + 1).padStart(lineNumberPadding, " ")

	return (
		<section className={className(styles.block, props.className)}>
			<FauxWindow className={styles.window} controls>
				<code>
					{tokensByLine.map((tokens, lineIndex) => (
						<div key={`code-line-${lineIndex}`}>
							<span className={styles.lineNumber}>{formattedLineIndex(lineIndex)}</span>
							<span className={styles.lineContent}>
								{tokens.map((token, tokenIndex) => {
									const kind = token.kind ?? ThemeFormatKey.Foreground
									const word = token.word
									const color = theme ? colorFromIntermediateTheme(theme, kind) : Color.black
									const style: CSSProperties = { color: color.hex }

									return (
										<span key={`code-${lineIndex}-${tokenIndex}-${kind}`} style={style}>
											{word}
										</span>
									)
								})}
							</span>
						</div>
					))}
				</code>
			</FauxWindow>
		</section>
	)
}

export default ThemeCodePreview
