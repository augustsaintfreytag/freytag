import { CSSProperties, FunctionComponent } from "react"
import FauxWindow from "~/components/faux-window/faux-window"
import { PropsWithAnyChildren, PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"
import { tokenizedStringByLines } from "~/utils/tokenized-string/functions/tokenized-string-line-split"
import { colorFromIntermediateTheme, ThemeFormatKey } from "~/utils/tokenized-string/library/theme-format-key"
import { SyntaxToken, TokenizedString } from "~/utils/tokenized-string/models/tokenized-string"
import styles from "./theme-code-preview.module.sass"

// Code Components

interface CodeProps {
	theme: IntermediateTheme
	tokensByLine: SyntaxToken[][]
	windowed?: boolean
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

// Enclosure Component

interface EnclosureProps extends PropsWithClassName, PropsWithAnyChildren {
	background?: Color
	windowed?: boolean
}

const Enclosure: FunctionComponent<EnclosureProps> = props => {
	if (!props.windowed) {
		const style: CSSProperties = { background: props.background?.rgb }

		return (
			<div className={className(styles.block, props.className)} style={style}>
				<div className={styles.content}>{props.children}</div>
			</div>
		)
	}

	return (
		<div className={className(styles.block, props.className)}>
			<FauxWindow className={styles.window} background={props.background?.rgb} controls>
				{props.children}
			</FauxWindow>
		</div>
	)
}

// Main Component

interface Props extends PropsWithClassName {
	theme?: IntermediateTheme
	content?: TokenizedString
	windowed?: boolean
}

const ThemeCodePreview: FunctionComponent<Props> = props => {
	const theme = props.theme

	if (!theme) {
		return (
			<Enclosure className={className(props.className, props.windowed && styles.isWindowed)} windowed={props.windowed}>
				<CodeFallback />
			</Enclosure>
		)
	}

	const tokenizedString = props.content ?? new TokenizedString([])
	const tokensByLine = tokenizedStringByLines(tokenizedString)
	const backgroundColor = colorFromIntermediateTheme(theme, ThemeFormatKey.Background)

	return (
		<Enclosure className={className(props.className, props.windowed && styles.isWindowed)} background={backgroundColor} windowed={props.windowed}>
			<Code theme={theme} tokensByLine={tokensByLine} />
		</Enclosure>
	)
}

export default ThemeCodePreview
