import { CockpitDataAccess } from "cockpit-access"
import { ApiCollection, defaultApiFilter } from "~/api/common/functions/data-access"
import { dateFromTimestamp } from "~/api/common/functions/date-conversion"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { TimeInterval } from "~/utils/date/library/intervals"
import { Dictionary } from "~/utils/types/library/dictionary"

// Work Showcase Collection

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

// Work Showcase

export async function workShowcaseFromApi(slug: string): Promise<WorkShowcase | undefined> {
	const filter = { ...defaultApiFilter, slug: slug }
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Work, { filter: filter })
	const firstEntry = response.entries[0] as WorkShowcase | undefined

	return firstEntry
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

function sortedWorkShowcaseDates(showcases: WorkShowcase[]): Date[] {
	return showcases
		.map(showcase => {
			const timestamp = showcase._created
			const date = dateFromTimestamp(timestamp)

			return date
		})
		.sort((lhs, rhs) => {
			const lhsv = lhs.valueOf()
			const rhsv = rhs.valueOf()

			if (lhsv > rhsv) {
				return 1
			}

			if (lhsv < rhsv) {
				return -1
			}

			return 0
		})
}

export function lastWorkShowcaseModificationDate(showcases: WorkShowcase[]): Date | undefined {
	const showcaseDates = sortedWorkShowcaseDates(showcases)

	if (!showcaseDates.length) {
		return undefined
	}

	return showcaseDates[showcaseDates.length - 1]
}

const averageTimeIntervalSampleSize = 5

export function averageTimeIntervalBetweenShowcases(showcases: WorkShowcase[]): TimeInterval | undefined {
	if (showcases.length < 2) {
		return undefined
	}

	const showcaseDates = sortedWorkShowcaseDates(showcases)
	const showcaseSelection = showcaseDates.slice(Math.max(0, -averageTimeIntervalSampleSize - 1)).reverse()
	const intervalDifferences = showcaseSelection.reduce((differences: TimeInterval[], date: Date, index: number) => {
		const subsequentDate = showcaseSelection[index + 1]
		if (!subsequentDate) {
			return differences
		}

		const difference = Math.abs(date.valueOf() - subsequentDate.valueOf())

		differences.push(difference)
		return differences
	}, [])

	const averageIntervalDifference = intervalDifferences.reduce((sum, value) => sum + value, 0) / intervalDifferences.length
	return averageIntervalDifference
}
