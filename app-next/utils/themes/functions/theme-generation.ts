import { ThemeFormat, themeFormatIdentifierForFormat } from "~/api/cockpit/records/themes/library/theme-format"
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
	await executeRemoteCommands(themesHost(), [`mkdir -p ${themesOutputPath()}/${identifier}`, `chmod -R 777 ${themesOutputPath()}/${identifier}`])
}

export async function clearThemeOutputDirectory(): Promise<void> {
	await executeRemoteCommand(themesHost(), `rm -rf ${themesOutputPath()}/* &> /dev/null`)
}

/** Generate a collection of themes to the configured output, including a manifest.
 *  Creates and outputs themes of formats specified with `generatedThemeFormats`.
 */
export async function generateThemeCollection(properties: ThemeGenerationProperties): Promise<ThemeManifest> {
	const { id, name, description, colors } = properties
	const manifest = generateManifest(properties, generatedThemeFormats)

	const encodedManifest = manifest.toJSON()
	const encodedColors = colors.map(color => color.hex).join(",")
	const rootPath = `${themesOutputPath()}/${id}`

	const commandForClearThemeDirectory = () => {
		return `rm -rf "${rootPath}" &> /dev/null`
	}

	const commandForMakeThemeDirectoryForFormat = (format: ThemeFormat) => {
		const formatIdentifier = themeFormatIdentifierForFormat(format)
		return `mkdir -p "${rootPath}/${formatIdentifier}"`
	}

	const commandForGenerateThemeWithFormat = (format: ThemeFormat) => {
		const formatIdentifier = themeFormatIdentifierForFormat(format)
		return `color-theme-utility generate-theme -f ${formatIdentifier} -c "${encodedColors}" --name "${name}" --description "${description}" -o "${rootPath}/${formatIdentifier}"`
	}

	const commandForArchiveThemeWithFormat = (format: ThemeFormat) => {
		const formatIdentifier = themeFormatIdentifierForFormat(format)
		const themeResource = themeFileName(name, format)
		const themePath = `${rootPath}/${formatIdentifier}/${themeResource}`

		console.log(`Running archival for assumed theme path '${themePath}'.`)
		return `zip -rm ${themePath}.zip ${themePath}`
	}

	const commandForWritingManifest = () => {
		return `cat << EOF > ${rootPath}/manifest.json\n${encodedManifest}\nEOF`
	}

	const commands = [
		commandForClearThemeDirectory(),
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
			group: themeFormatIdentifierForFormat(format),
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
			return `${themesVendor()}.${normalizedThemeFileName(name)}-${themesDefaultVersion()}`
	}
}

function normalizedThemeFileName(name: string): string {
	return name.toLowerCase().replaceAll(" ", "-")
}
