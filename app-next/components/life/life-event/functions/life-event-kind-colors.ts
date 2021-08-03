import { ColorValue } from "~/api/common/library/color-value"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import { Dictionary } from "~/utils/types/library/dictionary"

const fallbackLifeEventKindColor: ColorValue = "#1c1c1c"

export const lifeEventKindColors: Dictionary<string, ColorValue> = {
	all: "#d6d6d6",
	external: "#f0e9b1",
	life: "#f0b6c1",
	film: "#473ff8",
	development: "#a180c6",
	artwork: "#a0d3dd",
	photography: "#3ff8d4",
	writing: "#fcbd47"
}

export function colorForLifeEventKind(kind: LifeEventKind): ColorValue {
	const key = kind.toString().toLowerCase()
	const color = lifeEventKindColors[key] ?? fallbackLifeEventKindColor

	return color
}
