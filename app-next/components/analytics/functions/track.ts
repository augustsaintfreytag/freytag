import { appEnvironmentIsDevelopment } from "~/components/meta/library/app"
import { Dictionary } from "~/utils/types/library/dictionary"

// Library

type EventIdentifier = string
type Props = Dictionary<string, string | number | undefined>

interface Options {
	props: Props
}

type TrackFunction = (event: EventIdentifier, options: Options) => void

// Track

export function track(event: EventIdentifier, props: Props): void {
	withTrackFunction(track => track(event, { props: filteredProps(props) }))
}

// Track Access

function safeTrackFunction(): TrackFunction | undefined {
	const reference = window as any | undefined

	if (typeof reference === "undefined" || typeof reference.plausible !== "function") {
		return undefined
	}

	return reference.plausible as TrackFunction
}

function withTrackFunction(block: (track: TrackFunction) => void) {
	if (appEnvironmentIsDevelopment()) {
		return
	}

	const trackFunction = safeTrackFunction()

	if (!trackFunction) {
		console.warn(`Expected window and Analytics function reference for track but not defined.`)
		return
	}

	block(trackFunction)
}

// Prop Form

function filteredProps(unfilteredProps: Props): Props {
	const filteredProps: Props = {}

	for (const key in unfilteredProps) {
		if (unfilteredProps[key] === undefined) {
			continue
		}

		filteredProps[key] = unfilteredProps[key]
	}

	return filteredProps
}
