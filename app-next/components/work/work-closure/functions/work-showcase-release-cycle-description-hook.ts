import { useMemo } from "react"
import * as WorkShwocaseDataAccess from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import { formattedTimeInterval } from "~/utils/date/functions/time-formatting"
import { TimeInterval } from "~/utils/date/library/intervals"

const { averageTimeIntervalBetweenShowcases, lastWorkShowcaseModificationDate } = WorkShwocaseDataAccess

type Properties<Value> = {
	value: Value
	description: string
}

type ReleaseCycleProperties = {
	lastShowcaseCreation?: Properties<Date>
	averageShowcaseCreation?: Properties<TimeInterval>
}

export function useWorkShowcaseReleaseCycleDescription(showcases: WorkShowcase[]): ReleaseCycleProperties {
	const showcaseIds = showcases.map(showcase => showcase._id)

	const lastShowcaseCreation = useMemo<Properties<Date> | undefined>(() => {
		const lastCreationDate = lastWorkShowcaseModificationDate(showcases)
		if (!lastCreationDate) {
			return undefined
		}

		return {
			value: lastCreationDate,
			description: formattedDate(lastCreationDate, DateFormatStyle.DayMonthAndYear)
		}
	}, [showcaseIds])

	const averageShowcaseCreationDaysThreshold = 90
	const averageShowcaseCreation = useMemo<Properties<TimeInterval> | undefined>(() => {
		const averageInterval = averageTimeIntervalBetweenShowcases(showcases)
		const thresholdInterval = averageShowcaseCreationDaysThreshold * 86400

		if (!averageInterval) {
			return undefined
		}

		if (averageInterval > thresholdInterval) {
			return undefined
		}

		return {
			value: averageInterval,
			description: formattedTimeInterval(averageInterval)
		}
	}, [showcaseIds])

	return { lastShowcaseCreation, averageShowcaseCreation }
}
