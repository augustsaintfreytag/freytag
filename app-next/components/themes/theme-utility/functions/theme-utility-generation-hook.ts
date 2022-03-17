import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import WebAssemblyModule from "webassembly-module"
import { generateThemeViaModule } from "~/components/themes/theme-utility/functions/theme-utility-functions"
import { Color } from "~/utils/colors/models/color"
import { TimeInterval } from "~/utils/date/library/intervals"
import { performanceMeasureDuration, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"

enum PerformanceKey {
	GenerateTheme = "generate-theme-via-module"
}

const themeGenerationDebounceInterval: TimeInterval = 25

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

	const generateTheme = useDebouncedCallback(async () => {
		if (!utility) {
			return
		}

		const currentColorKey = keyForColors(colors)
		if (currentColorKey === lastUsedColorKey) {
			return
		}

		startPerformanceMeasure(PerformanceKey.GenerateTheme)
		const theme = await generateThemeViaModule(utility, colors)
		stopPerformanceMeasure(PerformanceKey.GenerateTheme)

		console.log(`Generated theme from colors via WebAssembly module in ${performanceMeasureDuration(PerformanceKey.GenerateTheme)}.`)

		if (!theme) {
			console.error(`Could not generate theme from colors '${colors.map(color => color.hex)}'.`)
		}

		setLastUsedColorKey(currentColorKey)
		setGeneratedTheme(theme)
	}, themeGenerationDebounceInterval)

	useEffect(() => {
		generateTheme()
	}, [isLoadingUtility, colors])

	return generatedTheme
}
