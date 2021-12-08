import { CockpitRecord } from "cockpit-access"
import { useMemo } from "react"
import { averageTimeIntervalBetweenRecordCreation, lastRecordModificationDate } from "~/api/records/statistics/functions/record-creation-statistics"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import { formattedTimeInterval } from "~/utils/date/functions/time-formatting"
import { TimeInterval } from "~/utils/date/library/intervals"

type Properties<Value> = {
	value: Value
	description: string
}

type ReleaseCycleProperties = {
	lastRecordCreation?: Properties<Date>
	averageRecordCreation?: Properties<TimeInterval>
}

export function useRecordCreationStatistics(records: CockpitRecord[]): ReleaseCycleProperties {
	const recordIds = records.map(record => record._id)

	const lastRecordCreation = useMemo<Properties<Date> | undefined>(() => {
		const lastCreationDate = lastRecordModificationDate(records)
		if (!lastCreationDate) {
			return undefined
		}

		return {
			value: lastCreationDate,
			description: formattedDate(lastCreationDate, DateFormatStyle.DayMonthAndYear)
		}
	}, [recordIds])

	const useCycleThreshold = true
	const averageRecordCreationDaysThreshold = 90
	const numberOfSamples = 5

	const averageRecordCreation = useMemo<Properties<TimeInterval> | undefined>(() => {
		const averageInterval = averageTimeIntervalBetweenRecordCreation(records, numberOfSamples)
		const thresholdInterval = averageRecordCreationDaysThreshold * 86400

		if (!averageInterval) {
			return undefined
		}

		if (useCycleThreshold && averageInterval > thresholdInterval) {
			return undefined
		}

		return {
			value: averageInterval,
			description: formattedTimeInterval(averageInterval)
		}
	}, [recordIds])

	return { lastRecordCreation: lastRecordCreation, averageRecordCreation: averageRecordCreation }
}
