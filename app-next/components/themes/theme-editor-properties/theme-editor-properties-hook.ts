import { useLocalStorageState } from "~/components/local-storage/functions/local-storage-hook"
import { useEditorColors } from "~/components/themes/theme-editor-colors/theme-editor-colors-hook"
import { Color } from "~/utils/colors/models/color"
import { range } from "~/utils/range/range"
import { UUID } from "~/utils/uuid/uuid"

// Library

interface Properties {
	id?: UUID
	name: string
	description: string
	colors: Color[]
}

enum LocalStorageKey {
	Id = "themes.editor.id",
	Name = "themes.editor.name",
	Description = "themes.editor.description",
	Colors = "themes.editor.colors"
}

function defaultColors(): Color[] {
	const colors = range(0, 10).map(_ => Color.white)
	colors[0] = Color.black

	return colors
}

function defaultProperties(): Properties {
	return {
		name: "",
		description: "",
		colors: defaultColors()
	}
}

interface SetPropertiesBlock {
	id: (id: UUID) => void
	name: (name: string) => void
	description: (description: string) => void
	colors: (colors: Color[]) => void
}

export function useThemeEditorProperties(initialProperties: Properties = defaultProperties()): [Properties, SetPropertiesBlock] {
	const [themeId, setThemeId] = useLocalStorageState<UUID | undefined>(LocalStorageKey.Id, initialProperties.id)
	const [themeName, setThemeName] = useLocalStorageState(LocalStorageKey.Name, initialProperties.name)
	const [themeDescription, setThemeDescription] = useLocalStorageState(LocalStorageKey.Description, initialProperties.description)
	const [themeColors, setThemeColors] = useEditorColors(LocalStorageKey.Colors, initialProperties.colors)

	const propertiesBlock: Properties = {
		id: themeId,
		name: themeName,
		description: themeDescription,
		colors: themeColors
	}

	const setPropertiesBlock: SetPropertiesBlock = {
		id: setThemeId,
		name: setThemeName,
		description: setThemeDescription,
		colors: setThemeColors
	}

	return [propertiesBlock, setPropertiesBlock]
}
