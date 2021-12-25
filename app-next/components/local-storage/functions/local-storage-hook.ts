import { useState } from "react"
import { isServerSide } from "~/utils/render/initial-render-hook"

type SetLocalStorageValue<Value> = (value: Value) => void
type SetValueBlock<Value> = (newValue: Value) => void

function setValueInLocalStorage<Value>(key: string, value: Value) {
	withLocalStorage(localStorage => localStorage.setItem(key, JSON.stringify(value)))
}

function getValueFromLocalStorage<Value>(key: string): Value | undefined {
	return withLocalStorage(localStorage => {
		const rawValue = localStorage.getItem(key)

		if (!rawValue) {
			return undefined
		}

		return JSON.parse(rawValue) as Value
	})
}

function withLocalStorage<ReturnValue>(block: (localStorage: Storage) => ReturnValue): ReturnValue | undefined {
	if (isServerSide() || typeof window?.localStorage === "undefined") {
		return undefined
	}

	return block(window.localStorage)
}

export function useLocalStorageState<Value>(key: string, initialValue: Value): [value: Value, setValueBlock: SetValueBlock<Value>] {
	const storedValue = getValueFromLocalStorage<Value>(key)

	if (storedValue === undefined) {
		setValueInLocalStorage(key, initialValue)
	}

	const [presentedValue, setPresentedValue] = useState<Value>(storedValue ?? initialValue)

	const setValueBlock: SetValueBlock<Value> = (newValue: Value) => {
		setValueInLocalStorage(key, newValue)
		setPresentedValue(newValue)
	}

	return [presentedValue, setValueBlock]
}
