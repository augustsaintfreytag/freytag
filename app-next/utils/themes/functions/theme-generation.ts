import escapeShell from "shell-escape"
import { ThemeFormat, themeFormatIdentifierForFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { Color } from "~/utils/colors/models/color"
import { executeRemoteCommands } from "~/utils/commands/functions/command-execution"
import { archivedThemeFormats, generatedThemeFormats, themesHost, themesOutputPath } from "~/utils/themes/functions/theme-configuration"
import { generateManifest } from "~/utils/themes/functions/theme-manifest"
import { themeFileName } from "~/utils/themes/functions/theme-resources"
import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"

function escape(string: string): string {
	return escapeShell([string])
}

// Commands

function commandForClearThemeDirectory(path: string): string {
	return `rm -rf ${path} &> /dev/null`
}

function commandForMakeThemeDirectory(path: string): string {
	return `mkdir -m 775 ${path}`
}

function commandForMakeThemeDirectoryForFormat(path: string, format: ThemeFormat): string {
	const formatIdentifier = themeFormatIdentifierForFormat(format)
	return `mkdir -m 775 ${path}/${formatIdentifier}`
}

function commandForGenerateThemeWithFormat(
	path: string,
	format: ThemeFormat,
	name: string | undefined,
	description: string | undefined,
	colors: Color[]
): string {
	const formatIdentifier = themeFormatIdentifierForFormat(format)
	const encodedColors = colors.map(color => color.hex).join(",")
	const commandComponents: string[] = []

	commandComponents.push(`color-theme-utility generate-theme`)
	commandComponents.push(`-f ${formatIdentifier}`)
	commandComponents.push(`-c ${escape(encodedColors)}`)

	if (name) {
		commandComponents.push(`--name ${escape(name)}`)
	}

	if (description) {
		commandComponents.push(`--description ${escape(description)}`)
	}

	commandComponents.push(`-o ${path}/${formatIdentifier}`)

	return commandComponents.join(" ")
}

function commandForArchiveThemeWithFormat(path: string, format: ThemeFormat, name: string): string {
	const formatIdentifier = themeFormatIdentifierForFormat(format)
	const themeResource = themeFileName(name, format)
	const themePath = `${path}/${formatIdentifier}`

	return `pushd ${escape(themePath)} && zip -rm ${escape(`${themeResource}.zip`)} ${escape(themeResource)} && popd`
}

function commandForWritingManifest(path: string, manifest: ThemeManifest): string {
	const encodedManifest = manifest.toJSON()
	const manifestPath = `${path}/manifest.json`
	return `cat << EOF > ${escape(manifestPath)}\n${encodedManifest}\nEOF`
}

// Generation

/** Generate a collection of themes to the configured output, including a manifest.
 *  Creates and outputs themes of formats specified with `generatedThemeFormats`.
 */
export async function generateThemeCollection(properties: ThemeGenerationProperties): Promise<ThemeManifest> {
	const { id, name, description, colors } = properties

	const manifest = generateManifest(properties, generatedThemeFormats)
	const basePath = `${themesOutputPath()}/${id}`

	const commands = [
		commandForClearThemeDirectory(basePath),
		commandForMakeThemeDirectory(basePath),
		...generatedThemeFormats.map(format => commandForMakeThemeDirectoryForFormat(basePath, format)),
		...generatedThemeFormats.map(format => commandForGenerateThemeWithFormat(basePath, format, name, description, colors)),
		...archivedThemeFormats.map(format => commandForArchiveThemeWithFormat(basePath, format, name)),
		commandForWritingManifest(basePath, manifest)
	]

	await executeRemoteCommands(themesHost(), commands)
	return manifest
}
