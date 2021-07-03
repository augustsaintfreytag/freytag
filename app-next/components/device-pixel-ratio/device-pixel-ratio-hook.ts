import { useEffect, useState } from "react"
import { addGlobalMediaMatchListener, removeGlobalMediaMatchListener } from "~/components/device-pixel-ratio/functions/device-pixel-ratio-media-match"

// Library

export type DotsPerPixel = number

// Constants

const defaultFallbackDevicePixelRatio: DotsPerPixel = 1.0

// Ratio

function safeDevicePixelRatio(): DotsPerPixel {
	if (typeof window === "undefined" || typeof window.devicePixelRatio === "undefined") {
		return defaultFallbackDevicePixelRatio
	}

	return window.devicePixelRatio
}

// Hook

export default function useDevicePixelRatio(): DotsPerPixel {
	const [activeRatio, setActiveRatio] = useState<DotsPerPixel>(safeDevicePixelRatio())

	useEffect(() => {
		const onEventChange = () => {
			setActiveRatio(safeDevicePixelRatio())
		}

		addGlobalMediaMatchListener(onEventChange)

		return () => {
			removeGlobalMediaMatchListener(onEventChange)
		}
	}, [])

	return activeRatio
}
