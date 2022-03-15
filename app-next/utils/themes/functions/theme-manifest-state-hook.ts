import { useState } from "react"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"
import { ThemeManifestState, ThemeManifestStateKind } from "~/utils/themes/library/theme-manifest-state"

type SetStateBlock = {
	none: () => void
	pending: () => void
	generated: (manifest: ThemeManifest) => void
	error: (message?: string) => void
}

export function useThemeManifestState(initialState: ThemeManifestState): [ThemeManifestState, SetStateBlock] {
	const [state, setState] = useState<ThemeManifestState>(initialState)

	const setStateBlock = {
		none: () => {
			setState({ kind: ThemeManifestStateKind.None })
		},
		pending: () => {
			setState({ kind: ThemeManifestStateKind.Pending })
		},
		generated: (manifest: ThemeManifest) => {
			setState({ kind: ThemeManifestStateKind.Generated, manifest })
		},
		error: (message?: string) => {
			setState({ kind: ThemeManifestStateKind.Error, message })
		}
	}

	return [state, setStateBlock]
}
