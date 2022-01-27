import { FunctionComponent } from "react"
import ActionButton from "~/components/action-button/action-button"
import ActionButtonStack from "~/components/action-button/action-button-stack"
import { useKeyEventState } from "~/components/key-event/key-event-hook"
import { PropsWithClassName } from "~/types/props"
import { colorFromHexDescription } from "~/utils/colors/functions/color-conversion"
import { Color } from "~/utils/colors/models/color"
import { range } from "~/utils/range/range"

interface Props extends PropsWithClassName {
	getColors: () => Color[]
	onChangeColors?: (newColors: Color[]) => void
}

const ThemeEditorColorMenu: FunctionComponent<Props> = props => {
	const isOptionKeyPressed = useKeyEventState(event => event.altKey)

	const encodedColors = () =>
		props
			.getColors()
			.map(color => color.hex)
			.join(", ")

	const onCopy = () => {
		navigator.clipboard.writeText(encodedColors())
	}

	const onImport = () => {
		const userInput = prompt("Paste a colour sequence to set the editor's current palette.", encodedColors()) ?? ""
		const userColors = userInput
			.split(",")
			.map(colorDescription => colorFromHexDescription(colorDescription.trim()))
			.filter(color => color) as Color[]

		if (userColors.length !== 10) {
			return
		}

		props.onChangeColors?.(userColors)
	}

	const onRandomize = (isUnbounded: boolean = false) => {
		if (isUnbounded) {
			const randomColors = range(0, 10).map(() => Color.random)
			props.onChangeColors?.(randomColors)
			return
		}

		const randomColors = range(0, 10).map(() => Color.randomLight)
		randomColors[0] = new Color(0.1, 0.1, 0.1).jittered

		props.onChangeColors?.(randomColors)
	}

	return (
		<ActionButtonStack className={props.className}>
			<ActionButton text="Copy" title="Copy Colour Sequence to Pasteboard" symbol="#Copy Symbol" onClick={onCopy} />
			<ActionButton text="Import" title="Import Colour Sequence" symbol="#Import Symbol" onClick={onImport} />
			<ActionButton
				text={isOptionKeyPressed ? "Randomise (Unbounded)" : "Randomise"}
				title="Generate Random Colour Sequence"
				symbol="#Randomize Symbol"
				onClick={() => onRandomize(isOptionKeyPressed)}
			/>
		</ActionButtonStack>
	)
}

export default ThemeEditorColorMenu
