import { Context } from "cockpit-access"
import { assetUrlFromComponent } from "~/api/cockpit/records/asset/functions/asset-source-provider"
import { decodedIntermediateThemeFromData } from "~/api/cockpit/records/themes/functions/theme-package-decoding"
import { ThemePackage } from "~/api/cockpit/records/themes/library/theme"
import { ApiError } from "~/api/common/errors/api-error"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"

export async function intermediateThemeFileFromApi(themePackage: ThemePackage): Promise<IntermediateTheme> {
	const themePackagePath = themePackage.file.path
	const themePackageUrl = assetUrlFromComponent(themePackagePath, Context.Server)

	try {
		const themePackageResponse = await fetch(themePackageUrl)
		const themePackageData = await themePackageResponse.text()
		const themeFile = decodedIntermediateThemeFromData(themePackageData)

		if (!themeFile) {
			throw new ApiError(`Could not decode intermediate theme file.`)
		}

		return themeFile
	} catch (error) {
		throw new ApiError(`Could not fetch intermediate theme package from '${themePackageUrl}'. ${error}`)
	}
}
