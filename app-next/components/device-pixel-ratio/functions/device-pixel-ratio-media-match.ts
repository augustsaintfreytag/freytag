// Constants

const devicePixelRatioMatchQuery = "screen and (resolution: 1dppx), screen and (-webkit-device-pixel-ratio: 1)"

// Media Match

function mediaMatch(): MediaQueryList | undefined {
	if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
		return undefined
	}

	return window.matchMedia(devicePixelRatioMatchQuery)
}

// Global Listener

const listeners: (() => void)[] = []

function onEventChange(): void {
	for (const listener of listeners) {
		listener()
	}
}

function setUpGlobalMediaMatchListener(): void {
	mediaMatch()?.addEventListener("change", onEventChange, false)
}

function tearDownGlobalMediaMatchListener(): void {
	mediaMatch()?.removeEventListener("change", onEventChange)
}

// Listener Registration

export function addGlobalMediaMatchListener(onChange: () => void) {
	listeners.push(onChange)
}

export function removeGlobalMediaMatchListener(onChange: () => void) {
	for (let index = 0; index < listeners.length; index++) {
		if (listeners[index] === onChange) {
			listeners.splice(index, 1)
		}
	}
}

// Module

setUpGlobalMediaMatchListener()
