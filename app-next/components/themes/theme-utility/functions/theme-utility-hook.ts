import { useEffect, useState } from "react"
import WebAssemblyModule, { fetchWebAssemblyModuleData, instantiateWebAssemblyModule } from "webassembly-module"
import { performanceMeasure, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
import { URL } from "~/utils/routing/library/url"

const modulePath: URL = `/color-theme-assembly.min.wasm`

let moduleInstance: WebAssemblyModule | undefined

enum PerformanceKey {
	moduleFetch = "theme-utility-module-fetch",
	moduleInit = "theme-utility-module-init"
}

async function setUpModule() {
	startPerformanceMeasure(PerformanceKey.moduleFetch)
	const moduleData = await fetchWebAssemblyModuleData(modulePath)
	stopPerformanceMeasure(PerformanceKey.moduleFetch)

	startPerformanceMeasure(PerformanceKey.moduleInit)
	moduleInstance = await instantiateWebAssemblyModule(moduleData)
	stopPerformanceMeasure(PerformanceKey.moduleInit)

	logModulePerformance()
}

function logModulePerformance() {
	console.log(
		`Loaded theme utility module in ${performanceMeasure(PerformanceKey.moduleFetch).duration}ms, initialized in ${
			performanceMeasure(PerformanceKey.moduleInit).duration
		}ms.`
	)
}

// Hook

export function useThemeUtility(deferLoading: boolean = false): [instance: WebAssemblyModule | undefined, isLoading: boolean, load: () => void] {
	const isPreloaded = moduleInstance !== undefined
	const [isLoading, setIsLoading] = useState(!isPreloaded)

	const load = () => {
		if (isLoading) {
			setUpModule().then(() => setIsLoading(false))
		}
	}

	useEffect(() => {
		if (!deferLoading) {
			load()
		}
	}, [])

	return [moduleInstance, isLoading, load]
}
