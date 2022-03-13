import { useEffect } from "react"

interface PageEventData {}

type PageEvent = CustomEvent<PageEventData>

export function usePageEvent(type: string, block: (event: PageEvent) => void) {
	useEffect(() => {
		assertEnvironment()

		const eventCallback = (event: Event) => {
			if (event instanceof CustomEvent === false) {
				return
			}

			block(event as PageEvent)
		}

		document.addEventListener(type, eventCallback)
		return () => document.removeEventListener(type, eventCallback)
	}, [])
}

export function dispatchPageEvent(type: string, data: PageEventData = {}) {
	assertEnvironment()

	const event = new CustomEvent(type, data)
	document.dispatchEvent(event)
}

function assertEnvironment() {
	if (typeof document === "undefined") {
		throw new TypeError(`Page event hook and listener can only be run client-side.`)
	}
}
