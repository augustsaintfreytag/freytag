import { useEffect, useState } from "react"
import { addGlobalMediaMatchListener, removeGlobalMediaMatchListener } from "~/components/device-pixel-ratio/functions/device-pixel-ratio-media-match"

// Library

export type DotsPerPixel = number

// Constants

export const defaultFallbackDevicePixelRatio: DotsPerPixel = 1.0

// Ratio

function safeDevicePixelRatio(): DotsPerPixel {
	if (typeof window === "undefined" || typeof window.devicePixelRatio === "undefined") {
		return defaultFallbackDevicePixelRatio
	}

	return window.devicePixelRatio
}

// Hook

export default function useDevicePixelRatio(initialValue?: DotsPerPixel): [DotsPerPixel, () => void] {
	const [activeRatio, setActiveRatio] = useState<DotsPerPixel>(initialValue ?? safeDevicePixelRatio())

	useEffect(() => {
		const onEventChange = () => {
			setActiveRatio(safeDevicePixelRatio())
		}

		addGlobalMediaMatchListener(onEventChange)

		return () => {
			removeGlobalMediaMatchListener(onEventChange)
		}
	}, [])

	const updateRatio = () => {
		setActiveRatio(safeDevicePixelRatio())
	}

	return [activeRatio, updateRatio]
}
