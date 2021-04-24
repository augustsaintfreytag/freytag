import { useEffect } from "react"

export function isServerSide() {
	return typeof window === "undefined"
}

export function useAfterInitialRender(block: () => void) {
	if (isServerSide()) {
		return
	}

	useEffect(block, [])
}
