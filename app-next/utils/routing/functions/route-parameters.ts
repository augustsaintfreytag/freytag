import type { Router } from "next/router"

export function stringParameter(router: Router, key: string): string | undefined {
	const value = router.query[key]
	if (!value || typeof value !== "string") {
		return undefined
	}

	return value
}
