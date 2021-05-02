import { CockpitDataAccess } from "cockpit-access"
import { ApiCollection, defaultApiFilter } from "~/utils/api/common/functions/data-access"
import { dateFromTimestamp } from "~/utils/api/common/functions/date-conversion"
import { WorkShowcase } from "~/utils/api/records/work-showcase/library/work-showcase"
import { Dictionary } from "~/utils/types/library/dictionary"

// Data Access

const workShowcaseCollectionFields: Dictionary<string, number> = {
	_id: 1,
	_created: 1,
	_modified: 1,
	display: 1,
	slug: 1,
	name: 1,
	description: 1,
	teaserImage: 1
}

export async function workShowcasesFromApi(): Promise<WorkShowcase[]> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Work, { filter: defaultApiFilter, fields: workShowcaseCollectionFields })
	const entries = response.entries as WorkShowcase[]

	return entries
}

// Data Processing

export function sortedWorkShowcases(showcases: WorkShowcase[]): WorkShowcase[] {
	return [...showcases].sort((lhs, rhs) => {
		if (lhs._created === rhs._created) {
			return 0
		}

		return lhs._created < rhs._created ? 1 : -1
	})
}

export function lastWorkShowcaseModificationDate(showcases: WorkShowcase[]): Date | undefined {
	const showcaseDates: Date[] = showcases
		.map(showcase => {
			const timestamp = showcase._created
			const date = dateFromTimestamp(timestamp)

			return date
		})
		.sort()

	if (!showcaseDates.length) {
		return undefined
	}

	return showcaseDates[showcaseDates.length - 1]
}
