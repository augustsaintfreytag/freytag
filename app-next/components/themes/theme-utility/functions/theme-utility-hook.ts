import { useEffect, useMemo, useState } from "react"
import WebAssemblyModule, { fetchWebAssemblyModuleData, instantiateWebAssemblyModule } from "webassembly-module"
import { dropshipHostClient } from "~/utils/app/app"
import { performanceMeasureDuration, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
import { URL } from "~/utils/routing/library/url"

let moduleInstance: WebAssemblyModule | undefined

enum PerformanceKey {
	ModuleFetch = "theme-utility-module-fetch",
	ModuleInit = "theme-utility-module-init"
}

function moduleVersion(): string | undefined {
	return process.env.NEXT_PUBLIC_COLOR_THEME_ASSEMBLY_VERSION
}

function modulePath(): URL {
	const dropshipHost = dropshipHostClient()
	const moduleName = `color-theme-assembly-${moduleVersion()}.min.wasm`

	return `https://${dropshipHost}/${moduleName}`
}

async function setUpModule() {
	if (moduleInstance) {
		return
	}

	startPerformanceMeasure(PerformanceKey.ModuleFetch)
	const moduleData = await fetchWebAssemblyModuleData(modulePath())
	stopPerformanceMeasure(PerformanceKey.ModuleFetch)

	startPerformanceMeasure(PerformanceKey.ModuleInit)
	moduleInstance = await instantiateWebAssemblyModule(moduleData)
	stopPerformanceMeasure(PerformanceKey.ModuleInit)

	logModulePerformance()
}

function logModulePerformance() {
	const fetchDuration = performanceMeasureDuration(PerformanceKey.ModuleFetch)
	const initDuration = performanceMeasureDuration(PerformanceKey.ModuleInit)

	console.log(`Loaded theme utility module in ${fetchDuration}, initialized in ${initDuration}.`)
}

// Hook

export function useThemeUtility(
	deferLoading: boolean = false
): [instance: WebAssemblyModule | undefined, isLoading: boolean, load: () => Promise<void>] {
	const [isLoading, setIsLoading] = useState(!false)

	const load = useMemo(
		() => async () => {
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
