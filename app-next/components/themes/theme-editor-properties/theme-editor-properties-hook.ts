import { useEffect, useState } from "react"
import { useLocalStorageState } from "~/components/local-storage/functions/local-storage-hook"
import { useEditorColors } from "~/components/themes/theme-editor-colors/theme-editor-colors-hook"
import { Color } from "~/utils/colors/models/color"
import { HashValue, hashValue } from "~/utils/hash/hash"
import { range } from "~/utils/range/range"
import { themeDescriptionMaxLength, themeNameMaxLength } from "~/utils/themes/functions/theme-configuration"
import { sanitizedThemeName } from "~/utils/themes/functions/theme-resources"
import { UUID } from "~/utils/uuid/uuid"

// Library

interface InputProperties {
	id?: UUID
	name: string
	description: string
	colors: Color[]
}

interface OutputProperties extends InputProperties {
	hash: HashValue
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

function defaultProperties(): InputProperties {
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

function hashValueFromProperties(properties: InputProperties): HashValue {
	const colorString = properties.colors.map(color => color.key).join()
	const mergedString = properties.id ?? "" + properties.name + properties.description + colorString

	return hashValue(mergedString)
}

type PropertiesSanitizationBlock = () => void

export function useThemeEditorProperties(
	initialProperties: InputProperties = defaultProperties()
): [OutputProperties, SetPropertiesBlock, PropertiesSanitizationBlock] {
	const [themeId, setThemeId] = useLocalStorageState<UUID | undefined>(LocalStorageKey.Id, initialProperties.id)
	const [themeName, setThemeName] = useLocalStorageState(LocalStorageKey.Name, initialProperties.name)
	const [themeDescription, setThemeDescription] = useLocalStorageState(LocalStorageKey.Description, initialProperties.description)
	const [themeColors, setThemeColors] = useEditorColors(LocalStorageKey.Colors, initialProperties.colors)

	const themeColorKey = themeColors.map(color => color.key).join()

	const hashForProperties = () => hashValueFromProperties({ id: themeId, name: themeName, description: themeDescription, colors: themeColors })
	const [propertiesHash, setPropertiesHash] = useState<string>(hashForProperties())

	useEffect(() => {
		setPropertiesHash(hashForProperties())
	}, [themeId, themeName, themeDescription, themeColorKey])

	const sanitizationBlock = () => {
		setThemeName(sanitizedThemeName(themeName).substring(0, themeNameMaxLength))
		setThemeDescription(themeDescription.substring(0, themeDescriptionMaxLength))
	}

	return [
		{
			hash: propertiesHash,
			id: themeId,
			name: themeName,
			description: themeDescription,
			colors: themeColors
		},
		{
			id: setThemeId,
			name: setThemeName,
			description: setThemeDescription,
			colors: setThemeColors
		},
		sanitizationBlock
	]
}
