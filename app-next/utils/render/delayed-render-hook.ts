import { useState } from "react"
import { TimeInterval } from "~/utils/date/library/intervals"
import { useAfterInitialRender } from "~/utils/render/initial-render-hook"

const defaultDelay: TimeInterval = 1000

export function useStateWithDelayedRender(delay?: TimeInterval) {
	const [hasTriggered, setHasTriggered] = useState(true)

	useAfterInitialRender(() => {
		setTimeout(() => setHasTriggered(false), delay ?? defaultDelay)
	})

	return hasTriggered
}
