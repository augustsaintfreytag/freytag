export namespace Conversion {

	export function date(string: string): Date|undefined {
		const date = new Date(string)
		
		if (isNaN(date.getDate())) {
			return undefined
		}

		return date
	}

}