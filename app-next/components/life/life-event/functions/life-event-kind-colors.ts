import { LifeEventKind } from "~/api/cockpit/records/life-event/library/life-event-kind"
import { ColorDescription } from "~/utils/colors/library/color-description"
import { Dictionary } from "~/utils/types/library/dictionary"

const fallbackLifeEventKindColor: ColorDescription = "#1c1c1c"

export const lifeEventKindColors: Dictionary<string, ColorDescription> = {
	life: "#d3caae",
	external: "#d3acb3",
	development: "#c197c1",
	artwork: "#83aec1",
	photography: "#e58187",
	film: "#7a97cb"
}

export function colorForLifeEventKind(kind: LifeEventKind): ColorDescription {
	const key = kind.toString().toLowerCase()
	const color = lifeEventKindColors[key] ?? fallbackLifeEventKindColor

	return color
}
