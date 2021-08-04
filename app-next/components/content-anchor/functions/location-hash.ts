import { useMemo } from "react"

function windowLocation(): Location | undefined {
	if (typeof window === "undefined") {
		return undefined
	}

	return window.location
}

export function locationHash(): string | undefined {
	const hashValue = windowLocation()?.hash?.replace(/^#/, "")
	return hashValue ?? undefined
}

export function useLocationHash(): string | undefined {
	return useMemo(() => locationHash(), [windowLocation()?.href])
}
