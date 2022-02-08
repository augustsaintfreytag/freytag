import { ChangeEvent, forwardRef, FunctionComponent, useRef, useState } from "react"
import ExternalLink from "~/components/link/external-link"
import { themeColorNames } from "~/components/themes/theme-color-collection/library/theme-color-labels"
import type { Page, PageProps } from "~/types/page"
import { className } from "~/utils/class-names/class-name"
import { colorFromHexDescription } from "~/utils/colors/functions/color-conversion"
import { ColorDescription } from "~/utils/colors/library/color-description"
import { Color } from "~/utils/colors/models/color"
import { range } from "~/utils/range/range"
import styles from "./prototype-editor-page.module.sass"

// Color Picker Component

interface ColorPickerProps {
	name: string
	color?: Color
	setColor?: (newColor: Color) => void
}

const ColorPicker: FunctionComponent<ColorPickerProps> = props => {
	function onColorValueChange(event: ChangeEvent<HTMLInputElement>) {
		const newHexValue = event.target.value
		const newColor = colorFromHexDescription(newHexValue)

		if (!newColor) {
			console.warn(`Could not get modeled color from hex description '${newHexValue}'.`)
			return
		}

		props.setColor?.(newColor)
	}

	return (
		<div className={styles.picker}>
			<div>{props.name}</div>
			<input type="color" value={props.color?.hex} onChange={onColorValueChange} />
		</div>
	)
}

// Code Component

interface EditableCodeDisplayProps {
	code: string
	setCode?: (newCode: string) => void
}

const EditableCodeDisplay = forwardRef<HTMLInputElement, EditableCodeDisplayProps>((props, ref) => (
	<input
		ref={ref}
		type="text"
		value={props.code}
		onChange={event => {
			const newContent = event.target.value
			props.setCode?.(newContent)
		}}
	/>
))

// Library

interface Props {}

// Functions

function encodedColorSequence(sequence: Color[]): string {
	const hexDescriptions = sequence.map(color => color.hex)
	return JSON.stringify(hexDescriptions)
}

function straightColorSequence(sequence: Color[]): string {
	const hexDescriptions = sequence.map(color => color.hex.substring(1))
	return hexDescriptions.join(", ")
}

// Page

const numberOfManagedColors = 10

const EditorPage: Page<PageProps & Props> = () => {
	const [colorSequence, setColorSequence] = useState<Color[]>(range(0, numberOfManagedColors).map(() => Color.black))
	const [editableStraightSequence, setEditableStraightSequence] = useState<string>(straightColorSequence(colorSequence))
	const [editableEncodedSequence, setEditableEncodedSequence] = useState<string>(encodedColorSequence(colorSequence))

	const straightSequenceRef = useRef<HTMLInputElement>(null)
	const encodedSequenceRef = useRef<HTMLInputElement>(null)

	function overwriteColorSequence(colorSequence: Color[]) {
		setColorSequence(colorSequence)

		if (straightSequenceRef.current !== document.activeElement) {
			setEditableStraightSequence(straightColorSequence(colorSequence))
		}

		if (encodedSequenceRef.current !== document.activeElement) {
			setEditableEncodedSequence(encodedColorSequence(colorSequence))
		}
	}

	function setColorSequenceFromHexDescriptions(colorDescriptions: ColorDescription[]) {
		const colors = colorDescriptions.map(colorDescription => colorFromHexDescription(colorDescription)).filter(color => color) as Color[]

		if (colors.length !== numberOfManagedColors) {
			console.error(`Could not set color sequence from hex descriptions. Expected ${numberOfManagedColors} colors, but got ${colors.length}.`)
			return
		}

		overwriteColorSequence(colors)
	}

	function setColorInSequence(color: Color, index: number) {
		const mutableColorSequence = [...colorSequence]
		mutableColorSequence[index] = color

		overwriteColorSequence(mutableColorSequence)
	}

	return (
		<section className={styles.page}>
			<header>
				<h1>Prototype Editor</h1>
				<div className={styles.introduction}>
					This editor is a makeshift application to allow editing and inspecting theme data used in conjunction with the{" "}
					<ExternalLink href="https://gitlab.com/apricum/color-theme-utility" untracked>
						Color Theme Utility
					</ExternalLink>
					.
				</div>
			</header>
			<main>
				<div className={className(styles.block, styles.colors)}>
					<header>
						<h2>Colors</h2>
					</header>
					<main>
						{range(0, numberOfManagedColors).map(index => (
							<ColorPicker
								key={index}
								name={themeColorNames[index]}
								color={colorSequence[index]}
								setColor={newColor => {
									setColorInSequence(newColor, index)
								}}
							/>
						))}
					</main>
				</div>
				<div className={className(styles.block, styles.colors)}>
					<header>
						<h2>Buffers</h2>
					</header>
					<main>
						<ColorPicker name={"Buffer 01"} />
						<ColorPicker name={"Buffer 02"} />
						<ColorPicker name={"Buffer 03"} />
					</main>
				</div>
				<div className={className(styles.block, styles.straightSequence)}>
					<header>
						<h2>Straight Sequence</h2>
					</header>
					<main>
						<EditableCodeDisplay
							ref={straightSequenceRef}
							code={editableStraightSequence}
							setCode={newValue => {
								setEditableStraightSequence(newValue)
								setColorSequenceFromHexDescriptions(newValue.split(",").map(element => element.trim()))
							}}
						/>
					</main>
				</div>
				<div className={className(styles.block, styles.encodedSequence)}>
					<header>
						<h2>Encoded Sequence</h2>
					</header>
					<main>
						<EditableCodeDisplay
							ref={encodedSequenceRef}
							code={editableEncodedSequence}
							setCode={newValue => {
								setEditableEncodedSequence(newValue)
								setColorSequenceFromHexDescriptions(JSON.parse(newValue))
							}}
						/>
					</main>
				</div>
			</main>
		</section>
	)
}

export default EditorPage
