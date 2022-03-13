import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export function useAutoResettingState<Value>(initialValue: Value, interval: number = 2000): [Value, (newValue: Value) => void] {
	const [state, setState] = useState<Value>(initialValue)
	const resetTimeout = useDebouncedCallback(() => {
		setState(initialValue)
	}, interval)

	const setStateWithTimedReset = (newValue: Value) => {
		setState(newValue)
		resetTimeout()
	}

	return [state, setStateWithTimedReset]
}
