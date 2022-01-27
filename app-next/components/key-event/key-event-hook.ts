import { useEffect, useState } from "react"

export function useKeyEventState(isKeyPressedBlock: (event: KeyboardEvent) => boolean): boolean {
	const [isKeyPressed, setIsKeyPressed] = useState(false)

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			setIsKeyPressed(isKeyPressedBlock(event))
		}

		addEventListener("keydown", listener)
		addEventListener("keyup", listener)

		return () => {
			removeEventListener("keydown", listener)
			removeEventListener("keyup", listener)
		}
	})

	return isKeyPressed
}
