import { CSSProperties, FunctionComponent } from "react"
import FauxWindow from "~/components/faux-window/faux-window"
import { tokenizedStringByLines } from "~/components/themes/theme-code-preview/functions/tokenized-string-line-split"
import { colorFromIntermediateTheme, ThemeFormatKey } from "~/components/themes/theme-code-preview/library/theme-format-key"
import { SyntaxToken, TokenizedString } from "~/components/themes/theme-code-preview/library/tokenized-string"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"
import styles from "./theme-code-preview.module.sass"

// Code Components

interface CodeProps {
	theme: IntermediateTheme
	tokensByLine: SyntaxToken[][]
}

const Code: FunctionComponent<CodeProps> = props => {
	const { theme, tokensByLine } = props
	const numberOfLines = tokensByLine.length
	const lineNumberPadding = String(numberOfLines).length

	const formattedLineIndex = (lineIndex: number) => String(lineIndex + 1).padStart(lineNumberPadding, " ")

	return (
		<code>
			{tokensByLine.map((tokens, lineIndex) => (
				<div className={styles.line} key={`code-line-${lineIndex}`}>
					<div className={styles.lineNumber}>{formattedLineIndex(lineIndex)}</div>
					<div className={styles.lineContent}>
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
					</div>
				</div>
			))}
		</code>
	)
}

const CodeFallback: FunctionComponent = () => <code>Preview not available for this theme package.</code>

// Main Component

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
					<CodeFallback />
				</FauxWindow>
			</section>
		)
	}

	const tokenizedString = props.content ?? new TokenizedString([])
	const tokensByLine = tokenizedStringByLines(tokenizedString)
	const backgroundColor = colorFromIntermediateTheme(theme, ThemeFormatKey.Background)

	return (
		<section className={className(styles.block, props.className)}>
			<FauxWindow className={styles.window} background={backgroundColor.rgb} controls>
				<Code theme={theme} tokensByLine={tokensByLine} />
			</FauxWindow>
		</section>
	)
}

export default ThemeCodePreview
