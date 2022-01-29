/** Starts a measurement using the global `performance` type. */
export function startPerformanceMeasure(key: string) {
	performance.mark(`${key}:start`)
}

/** Stops a previously started measurement using the global `performance` type. */
export function stopPerformanceMeasure(key: string) {
	performance.mark(`${key}:end`)
}

/** Returns the performance entry for the last measurement of the given key. */
export function performanceMeasure(key: string): PerformanceEntry {
	performance.measure(key, `${key}:start`, `${key}:end`)
	return performance.getEntriesByName(key)[0]
}

/** Returns the formatted measured duration using the global `performance` type.
 *
 * 	Only returns a duration as an integer number of milliseconds as the built-in
 *  performance type does not return further precision.
 */
export function performanceMeasureDuration(key: string): string {
	const duration = Math.round(performanceMeasure(key).duration)
	return `${duration}ms`
}
