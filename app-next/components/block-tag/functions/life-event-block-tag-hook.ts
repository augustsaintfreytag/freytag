import { useMemo } from "react"
import { ColorDescription } from "~/api/common/library/color-description"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import { colorForLifeEventKind } from "~/components/life/life-event/functions/life-event-kind-colors"

interface TagProperties {
	name: string
	color?: ColorDescription
}

const tagFallbackName = "Standalone"

export function useTagPropertiesForLifeEvent(kind?: LifeEventKind): TagProperties {
	return useMemo(() => {
		if (!kind) {
			return {
				name: tagFallbackName
			}
		}

		return {
			name: kind,
			color: colorForLifeEventKind(kind)
		}
	}, [kind])
}
