import { ColorValue } from "~/api/common/library/color-value"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import { Dictionary } from "~/utils/types/library/dictionary"

const fallbackLifeEventKindColor: ColorValue = "#1c1c1c"

export const lifeEventKindColors: Dictionary<string, ColorValue> = {
	life: "#d3caae",
	external: "#d3acb3",
	development: "#c197c1",
	artwork: "#83aec1",
	photography: "#e58187",
	film: "#7a97cb"
}

export function colorForLifeEventKind(kind: LifeEventKind): ColorValue {
	const key = kind.toString().toLowerCase()
	const color = lifeEventKindColors[key] ?? fallbackLifeEventKindColor

	return color
}
