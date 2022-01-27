import { useEffect, useMemo, useState } from "react"
import WebAssemblyModule, { fetchWebAssemblyModuleData, instantiateWebAssemblyModule } from "webassembly-module"
import { performanceMeasure, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
import { URL } from "~/utils/routing/library/url"

const modulePath: URL = `/color-theme-assembly.min.wasm`

let moduleInstance: WebAssemblyModule | undefined

enum PerformanceKey {
	ModuleFetch = "theme-utility-module-fetch",
	ModuleInit = "theme-utility-module-init"
}

async function setUpModule() {
	startPerformanceMeasure(PerformanceKey.ModuleFetch)
	const moduleData = await fetchWebAssemblyModuleData(modulePath)
	stopPerformanceMeasure(PerformanceKey.ModuleFetch)

	startPerformanceMeasure(PerformanceKey.ModuleInit)
	moduleInstance = await instantiateWebAssemblyModule(moduleData)
	stopPerformanceMeasure(PerformanceKey.ModuleInit)

	logModulePerformance()
}

function logModulePerformance() {
	console.log(
		`Loaded theme utility module in ${performanceMeasure(PerformanceKey.ModuleFetch).duration}ms, initialized in ${
			performanceMeasure(PerformanceKey.ModuleInit).duration
		}ms.`
	)
}

// Hook

export function useThemeUtility(
	deferLoading: boolean = false
): [instance: WebAssemblyModule | undefined, isLoading: boolean, load: () => Promise<void>] {
	const [isLoading, setIsLoading] = useState(!false)

	const load = useMemo(
		() => async () => {
			if (moduleInstance) {
				setIsLoading(false)
				return
			}

			if (isLoading) {
				await setUpModule()
				setIsLoading(false)
				return
			}
		},
		[]
	)

	useEffect(() => {
		if (!deferLoading) {
			load()
		}
	}, [])

	return [moduleInstance, isLoading, load]
}

export function useDeferredThemeUtility(): [instance: WebAssemblyModule | undefined, isLoading: boolean, load: () => Promise<void>] {
	return useThemeUtility(true)
}
