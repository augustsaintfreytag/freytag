import { Context } from "cockpit-access"
import { RecordError } from "~/api/common/errors/record-error"
import { assetUrlFromComponent } from "~/api/records/asset/functions/asset-source-provider"
import { decodedIntermediateThemeFromData } from "~/api/records/themes/functions/theme-package-decoding"
import { ThemePackage } from "~/api/records/themes/library/theme"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"

export async function intermediateThemeFileFromApi(themePackage: ThemePackage): Promise<IntermediateTheme> {
	const themePackagePath = themePackage.file.path
	const themePackageUrl = assetUrlFromComponent(themePackagePath, Context.Server)

	try {
		const themePackageResponse = await fetch(themePackageUrl)
		const themePackageData = await themePackageResponse.text()
		const themeFile = decodedIntermediateThemeFromData(themePackageData)

		if (!themeFile) {
			throw new RecordError(`Could not decode intermediate theme file.`)
		}

		return themeFile
	} catch (error) {
		throw new RecordError(`Could not fetch intermediate theme package from '${themePackageUrl}'. ${error}`)
	}
}
