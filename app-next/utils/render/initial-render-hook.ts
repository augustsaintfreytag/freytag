import { useEffect, useState } from "react"

export function isServerSide() {
	return typeof window === "undefined"
}

export function useAfterInitialRender(block: () => void) {
	if (isServerSide()) {
		return
	}

	useEffect(block, [])
}

export function useInitialRenderState(): boolean {
	const [didInitialRender, setDidInitialRender] = useState<boolean>(false)
	useAfterInitialRender(() => setDidInitialRender(true))

	return didInitialRender
}
