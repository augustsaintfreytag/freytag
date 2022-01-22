export function startPerformanceMeasure(key: string) {
	performance.mark(`${key}:start`)
}

export function stopPerformanceMeasure(key: string) {
	performance.mark(`${key}:end`)
}

export function performanceMeasure(key: string): PerformanceEntry {
	performance.measure(key, `${key}:start`, `${key}:end`)
	return performance.getEntriesByName(key)[0]
}
