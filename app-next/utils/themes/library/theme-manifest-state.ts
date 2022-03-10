import { ThemeManifest } from "~/utils/themes/library/theme-manifest"

export interface ThemeManifestKindNone {
	kind: ThemeManifestStateKind.None
}

export interface ThemeManifestKindPending {
	kind: ThemeManifestStateKind.Pending
}

export interface ThemeManifestKindGenerated {
	kind: ThemeManifestStateKind.Generated
	manifest: ThemeManifest
}

export type ThemeManifestState = ThemeManifestKindNone | ThemeManifestKindPending | ThemeManifestKindGenerated

export enum ThemeManifestStateKind {
	None = "none",
	Pending = "pending",
	Generated = "generated"
}
