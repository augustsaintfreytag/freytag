import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import { ThemeManifestState, ThemeManifestStateKind } from "~/utils/themes/library/theme-manifest-state"

export function descriptionForThemeManifestState(state: ThemeManifestState): string {
	switch (state.kind) {
		case ThemeManifestStateKind.None:
			return "Not cached, no themes generated."
		case ThemeManifestStateKind.Pending:
			return "Generating themes…"
		case ThemeManifestStateKind.Generated:
			const creationDate = state.manifest.dateCreated
			return `Cached, themes generated ${formattedDate(creationDate, DateFormatStyle.DayMonthYearAndTime)}.`
	}
}
