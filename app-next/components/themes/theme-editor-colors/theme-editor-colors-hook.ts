import { useEncodedLocalStorageState } from "~/components/local-storage/functions/local-storage-hook"
import { Color, ColorValue } from "~/utils/colors/models/color"

export function useEditorColors(initialColors: Color[]): [colors: Color[], setColors: (newColors: Color[]) => void] {
	const encodeColors = (colors: Color[]) => JSON.stringify(colors)
	const decodeColors = (value: string) => {
		try {
			const colorValues = JSON.parse(value) as ColorValue[]
			const colors = colorValues.map(colorValue => Color.fromValue(colorValue))

			return colors
		} catch {
			return []
		}
	}

	return useEncodedLocalStorageState<Color[]>("theme-editor-colors", encodeColors, decodeColors, initialColors)
}
