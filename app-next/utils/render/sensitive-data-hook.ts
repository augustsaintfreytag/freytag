import { useState } from "react"
import { useAfterInitialRender } from "~/utils/render/initial-render-hook"

export function useSensitiveDataDisplay(): boolean {
	const [shouldDisplayData, setShouldDisplayData] = useState(false)
	useAfterInitialRender(() => {
		setShouldDisplayData(true)
	})

	return shouldDisplayData
}
