import { useEffect, useState } from "react"
import WebAssemblyModule from "webassembly-module"
import { generateThemeViaModule } from "~/components/themes/theme-utility/functions/theme-utility-functions"
import { Color } from "~/utils/colors/models/color"
import { performanceMeasureDuration, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"

enum PerformanceKey {
	GenerateTheme = "generate-theme-via-module"
}

function keyForColors(colors: Color[]): string {
	return colors.map(color => color.key).join("/")
}

export function useGeneratedThemeViaThemeUtility(
	utility: WebAssemblyModule | undefined,
	isLoadingUtility: boolean,
	colors: Color[]
): IntermediateTheme | undefined {
	const [generatedTheme, setGeneratedTheme] = useState<IntermediateTheme | undefined>(undefined)
	const [lastUsedColorKey, setLastUsedColorKey] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (!utility) {
			return
		}

		const currentColorKey = keyForColors(colors)
		if (currentColorKey === lastUsedColorKey) {
			return
		}

		;(async () => {
			startPerformanceMeasure(PerformanceKey.GenerateTheme)
			const theme = await generateThemeViaModule(utility, colors)
			stopPerformanceMeasure(PerformanceKey.GenerateTheme)

			console.log(`Generated theme from colors via WebAssembly module in ${performanceMeasureDuration(PerformanceKey.GenerateTheme)}.`)

			if (!theme) {
				console.error(`Could not generate theme from colors '${colors.map(color => color.hex)}'.`)
			}

			setLastUsedColorKey(currentColorKey)
			setGeneratedTheme(theme)
		})()
	}, [isLoadingUtility, colors])

	return generatedTheme
}
