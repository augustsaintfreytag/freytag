import { useEffect, useState } from "react"

// Library

export type DotsPerPixel = number

// Constants

const defaultFallbackDevicePixelRatio: DotsPerPixel = 1.0
const devicePixelRatioMatchQuery = "screen and (resolution: 1dppx)"

// Ratio

function safeDevicePixelRatio(): DotsPerPixel {
	if (typeof window === "undefined" || typeof window.devicePixelRatio === "undefined") {
		return defaultFallbackDevicePixelRatio
	}

	return window.devicePixelRatio
}

// Media Match

function mediaMatch(): MediaQueryList | undefined {
	if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
		return undefined
	}

	return window.matchMedia(devicePixelRatioMatchQuery)
}

// Hook

export default function useDevicePixelRatio(): DotsPerPixel {
	const [activeRatio, setActiveRatio] = useState<DotsPerPixel>(safeDevicePixelRatio())

	useEffect(() => {
		const onEventChange = () => {
			setActiveRatio(safeDevicePixelRatio())
		}

		mediaMatch()?.addEventListener("change", onEventChange, false)

		return () => {
			mediaMatch()?.removeEventListener("change", onEventChange)
		}
	}, [])

	return activeRatio
}
