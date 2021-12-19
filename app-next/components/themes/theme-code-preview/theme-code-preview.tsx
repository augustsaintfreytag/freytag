import { CSSProperties, FunctionComponent } from "react"
import FauxWindow from "~/components/faux-window/faux-window"
import { tokenizedStringByLines } from "~/components/themes/theme-code-preview/functions/tokenized-string-line-split"
import { colorFromIntermediateTheme, ThemeFormatKey } from "~/components/themes/theme-code-preview/library/theme-format-key"
import { TokenizedString } from "~/components/themes/theme-code-preview/library/tokenized-string"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"
import styles from "./theme-code-preview.module.sass"

interface Props extends PropsWithClassName {
	theme?: IntermediateTheme
	content?: TokenizedString
}

const ThemeCodePreview: FunctionComponent<Props> = props => {
	const theme = props.theme

	if (!theme) {
		return (
			<section className={className(styles.block, props.className)}>
				<FauxWindow className={styles.window} controls>
					<code>Preview not available. Theme does not have an intermediate format package.</code>
				</FauxWindow>
			</section>
		)
	}

	const tokenizedString = props.content ?? new TokenizedString([])
	const tokensByLine = tokenizedStringByLines(tokenizedString)

	const numberOfLines = tokensByLine.length
	const lineNumberPadding = String(numberOfLines).length
	const formattedLineIndex = (lineIndex: number) => String(lineIndex + 1).padStart(lineNumberPadding, " ")
	const backgroundColor = colorFromIntermediateTheme(theme, ThemeFormatKey.Background)

	return (
		<section className={className(styles.block, props.className)}>
			<FauxWindow className={styles.window} background={backgroundColor.rgb} controls>
				<code>
					{tokensByLine.map((tokens, lineIndex) => (
						<div key={`code-line-${lineIndex}`}>
							<span className={styles.lineNumber}>{formattedLineIndex(lineIndex)}</span>
							<span className={styles.lineContent}>
								{tokens.map((token, tokenIndex) => {
									const kind = token.kind ?? ThemeFormatKey.Foreground
									const word = token.word
									const color = theme ? colorFromIntermediateTheme(theme, kind) : Color.black
									const lineStyle: CSSProperties = { color: color.hex }

									return (
										<span key={`code-${lineIndex}-${tokenIndex}-${kind}`} style={lineStyle}>
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
