import { useMemo } from "react"
import { LifeEventKind } from "~/api/cockpit/records/life-event/library/life-event-kind"
import { colorForLifeEventKind } from "~/components/life/life-event/functions/life-event-kind-colors"
import { ColorDescription } from "~/utils/colors/library/color-description"

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
