import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { executeRemoteCommand, executeRemoteCommands } from "~/utils/commands/functions/command-execution"
import {
	archivedThemeFormats,
	generatedThemeFormats,
	themesDefaultVersion,
	themesHost,
	themesOutputPath,
	themesVendor
} from "~/utils/themes/functions/theme-configuration"
import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { ThemeManifest, ThemeManifestPackage } from "~/utils/themes/library/theme-manifest"
import { Dictionary } from "~/utils/types/library/dictionary"

// Generation

export async function makeThemeOutputDirectory(identifier: string): Promise<void> {
	await executeRemoteCommands(themesHost(), [`mkdir -p ${themesOutputPath}/${identifier}`, `chmod -R 777 ${themesOutputPath}/${identifier}`])
}

export async function clearThemeOutputDirectory(): Promise<void> {
	await executeRemoteCommand(themesHost(), `rm -rf ${themesOutputPath}/* &> /dev/null`)
}

/** Generate a collection of themes to the configured output, including a manifest.
 *  Creates and outputs themes of formats specified with `generatedThemeFormats`.
 */
export async function generateThemeCollection(properties: ThemeGenerationProperties): Promise<ThemeManifest> {
	const { id, name, description, colors } = properties
	const manifest = generateManifest(properties, generatedThemeFormats)

	const encodedColors = colors.map(color => color.hex).join(",")
	const encodedManifest = manifest.toJSON()
	const rootPath = `${themesOutputPath}/${id}`

	const commandForMakeThemeDirectoryForFormat = (format: ThemeFormat) => {
		return `mkdir -p ${rootPath}/${format}`
	}

	const commandForGenerateThemeWithFormat = (format: ThemeFormat) => {
		return `color-theme-utility generate-theme -f ${format} -c "${encodedColors}" --name "${name}" --description "${description}" -o "${rootPath}/${format}"`
	}

	const commandForArchiveThemeWithFormat = (format: ThemeFormat) => {
		const themePath = `${rootPath}/${format}/${themeFileName(name, format)}`
		console.log(`Running archival for assumed theme path '${themePath}'.`)
		return `zip -rm ${themePath}.zip ${themePath}`
	}

	const commandForWritingManifest = () => {
		return `cat << EOF > ${rootPath}/manifest.json\n${encodedManifest}\nEOF`
	}

	const commands = [
		...generatedThemeFormats.map(commandForMakeThemeDirectoryForFormat),
		...generatedThemeFormats.map(commandForGenerateThemeWithFormat),
		...archivedThemeFormats.map(commandForArchiveThemeWithFormat),
		commandForWritingManifest()
	]

	await executeRemoteCommands(themesHost(), commands)
	return manifest
}

export function generateManifest(properties: ThemeGenerationProperties, formats: ThemeFormat[]): ThemeManifest {
	const packages: Dictionary<ThemeFormat, ThemeManifestPackage> = {}

	for (const format of formats) {
		let resourceName = themeFileName(properties.name, format)

		if (archivedThemeFormats.includes(format)) {
			resourceName += ".zip"
		}

		packages[format] = {
			format: format,
			group: format,
			resource: resourceName
		}
	}

	return new ThemeManifest(properties.id, properties.name, new Date(), packages)
}

// Name Form

export function themeFileName(name: string, format: ThemeFormat): string {
	switch (format) {
		case ThemeFormat.Intermediate:
			return `${name}.intertheme`
		case ThemeFormat.Xcode:
			return `${name}.xccolortheme`
		case ThemeFormat.TextMate:
			return `${name}.tmtheme`
		case ThemeFormat.VisualStudioCode:
			return `${themesVendor}.${normalizedThemeFileName(name)}-${themesDefaultVersion}`
	}
}

function normalizedThemeFileName(name: string): string {
	return name.toLowerCase().replaceAll(" ", "-")
}
