export namespace TruncatedTextProvider {

	export function truncated(input: string, cutoff: number): string {
		if (input.length < cutoff) {
			return input
		}

		return input.substr(0, cutoff) + "…"
	}

}