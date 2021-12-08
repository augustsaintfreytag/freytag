import { CockpitRecord } from "cockpit-access"
import { sortedRecordDates } from "~/api/records/statistics/functions/record-sorting"
import { TimeInterval } from "~/utils/date/library/intervals"

export function lastRecordModificationDate(records: CockpitRecord[]): Date | undefined {
	const showcaseDates = sortedRecordDates(records)

	if (!showcaseDates.length) {
		return undefined
	}

	return showcaseDates[showcaseDates.length - 1]
}

export function averageTimeIntervalBetweenRecordCreation(records: CockpitRecord[], numberOfSamples: number = 5): TimeInterval | undefined {
	if (records.length < 2) {
		return undefined
	}

	const creationDates = sortedRecordDates(records).reverse()
	const recordSelection = creationDates.slice(0, numberOfSamples)
	const intervalDifferences = recordSelection.reduce((differences: TimeInterval[], date: Date, index: number) => {
		const subsequentDate = recordSelection[index + 1]
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
