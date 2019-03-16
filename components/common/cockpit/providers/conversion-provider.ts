export namespace ConversionProvider {

	export function dateFromString(string: string): Date|undefined {
		const date = new Date(string)
		
		if (isNaN(date.getDate())) {
			return undefined
		}

		return date
	}

	export function dateFromTimestamp(timestamp: number): Date|undefined {
		const date = new Date(timestamp * 1000)

		if (isNaN(date.getDate())) {
			return undefined
		}

		return date
	}

}