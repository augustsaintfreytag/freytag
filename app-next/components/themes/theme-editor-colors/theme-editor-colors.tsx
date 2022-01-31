import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import ThemeColorCollection from "../theme-color-collection/theme-color-collection"
import ThemeEditorColorMenu from "../theme-editor-color-menu/theme-editor-color-menu"
import styles from "./theme-editor-colors.module.sass"

interface Props extends PropsWithClassName {
	colors: Color[]
	onColorCollectionSet: (colors: Color[]) => void
}

const ThemeEditorColors: FunctionComponent<Props> = props => {
	const onColorSet = (index: number, newColor: Color) => {
		const newColors = [...props.colors]
		newColors[index] = newColor

		props.onColorCollectionSet(newColors)
	}

	return (
		<div className={className(styles.block, props.className)}>
			<ThemeColorCollection className={styles.colors} colors={props.colors} setColor={onColorSet} compact editable />
			<ThemeEditorColorMenu className={styles.colorMenu} getColors={() => props.colors} onChangeColors={props.onColorCollectionSet} />
		</div>
	)
}

export default ThemeEditorColors
