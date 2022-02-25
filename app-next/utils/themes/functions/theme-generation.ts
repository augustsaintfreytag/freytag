import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { executeRemoteCommand, executeRemoteCommands } from "~/utils/commands/functions/command-execution"
import { ThemeManifest, ThemeManifestPackage } from "~/utils/themes/library/theme-manifest"
import { Dictionary } from "~/utils/types/library/dictionary"
import { UUID } from "~/utils/uuid/uuid"

// Configuration

export const themeHost = "color-theme-utility"
export const themesOutputPath = "/var/themes"
export const themesVendor = "color-theme-utility"
export const themesDefaultVersion = "1.0.0"

const generatedThemeFormats: ThemeFormat[] = [ThemeFormat.Intermediate, ThemeFormat.Xcode, ThemeFormat.VisualStudioCode]
const archivedThemeFormats: ThemeFormat[] = [ThemeFormat.VisualStudioCode]

// Library

interface ThemeGenerationProperties {
	id: UUID
	name: string
	description: string
	colors: string
}

// Generation

export async function makeThemeOutputDirectory(identifier: string): Promise<void> {
	await executeRemoteCommands(themeHost, [`mkdir -p ${themesOutputPath}/${identifier}`, `chmod -R 777 ${themesOutputPath}/${identifier}`])
}

export async function clearThemeOutputDirectory(): Promise<void> {
	await executeRemoteCommand(themeHost, `rm -rf ${themesOutputPath}/* &> /dev/null`)
}

/** Generate a collection of themes to the configured output, including a manifest. */
export async function generateThemeCollection(properties: ThemeGenerationProperties): Promise<void> {
	const { id, name, description, colors } = properties
	const rootPath = `${themesOutputPath}/${id}`

	const commandForMakeThemeDirectoryForFormat = (format: ThemeFormat) => {
		return `mkdir -p ${rootPath}/${format}`
	}

	const commandForGenerateThemeWithFormat = (format: ThemeFormat) => {
		return `color-theme-utility generate-theme -f ${format} -c "${colors}" --name "${name}" --description "${description}" -o "${rootPath}/${format}"`
	}

	const commandForArchiveThemeWithFormat = (format: ThemeFormat) => {
		const themePath = `${rootPath}/${format}/${themeFileName(name, format)}`
		console.log(`Running archival for assumed theme path '${themePath}'.`)
		return `zip -rm ${themePath}.zip ${themePath}`
	}

	const commandForWritingManifest = () => {
		const encodedManifest = JSON.stringify(generateManifest(properties, generatedThemeFormats), undefined, "\t")
		return `cat << EOF > ${rootPath}/manifest.json\n${encodedManifest}\nEOF`
	}

	const commands = [
		...generatedThemeFormats.map(commandForMakeThemeDirectoryForFormat),
		...generatedThemeFormats.map(commandForGenerateThemeWithFormat),
		...archivedThemeFormats.map(commandForArchiveThemeWithFormat),
		commandForWritingManifest()
	]

	await executeRemoteCommands(themeHost, commands)
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

	return {
		id: properties.id,
		name: properties.name,
		dateCreated: new Date(),
		packages
	}
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
