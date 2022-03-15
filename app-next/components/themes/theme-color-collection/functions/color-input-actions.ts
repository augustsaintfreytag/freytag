import { RefObject } from "react"

/**
 * Uses one recycled color input by ref, positions it in the bounds of an
 * event source element and opens it for editing.
 *
 * Assumes that the element referenced by `eventSourceRef` is a direct child
 * of the target used to position the input while it is active.
 */
export function focusColorInputOnEventSource(colorInputRef: RefObject<any>, eventSourceRef: RefObject<any>) {
	const input = colorInputRef?.current
	const eventSource = eventSourceRef?.current

	if (!eventSource || !input) {
		console.error(`Could not position and show color input, missing element references.`)
		return
	}

	const positionTarget = eventSource.parentElement!
	const colorBounds = boundsForElement(positionTarget)

	const inputVerticalOffset = 5
	const inputDummyHeight = input.clientHeight
	const colorPosition = { x: colorBounds.x, y: colorBounds.y + colorBounds.height - inputDummyHeight + inputVerticalOffset }

	input.style.inset = `${colorPosition.y}px 0 0 ${colorPosition.x}px`
	input.style.width = `${colorBounds.width}px`

	requestAnimationFrame(() => {
		input.focus()
		input.click()
	})
}

interface Bounds {
	x: number
	y: number
	width: number
	height: number
}

function boundsForElement(element: HTMLElement): Bounds {
	return {
		x: element.offsetLeft,
		y: element.offsetTop,
		width: element.clientWidth,
		height: element.clientHeight
	}
}
