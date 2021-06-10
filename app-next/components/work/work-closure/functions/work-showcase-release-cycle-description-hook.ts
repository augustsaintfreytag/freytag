import { useMemo } from "react"
import * as WorkShwocaseDataAccess from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import { formattedTimeInterval } from "~/utils/date/functions/time-formatting"

const { averageTimeIntervalBetweenShowcases, lastWorkShowcaseModificationDate } = WorkShwocaseDataAccess

export function useWorkShowcaseReleaseCycleDescription(
	showcases: WorkShowcase[]
): [lastShowcaseCreation: string | undefined, averageShowcaseCreation: string | undefined] {
	const showcaseIds = showcases.map(showcase => showcase._id)

	const lastShowcaseCreation = useMemo<string | undefined>(() => {
		const lastCreationDate = lastWorkShowcaseModificationDate(showcases)
		if (!lastCreationDate) {
			return undefined
		}

		return formattedDate(lastCreationDate, DateFormatStyle.DayMonthAndYear)
	}, [showcaseIds])

	const averageShowcaseCreationDaysThreshold = 90
	const averageShowcaseCreation = useMemo<string | undefined>(() => {
		const averageInterval = averageTimeIntervalBetweenShowcases(showcases)
		const thresholdInterval = averageShowcaseCreationDaysThreshold * 86400

		if (!averageInterval) {
			return undefined
		}

		if (averageInterval > thresholdInterval) {
			return undefined
		}

		return formattedTimeInterval(averageInterval)
	}, [showcaseIds])

	return [lastShowcaseCreation, averageShowcaseCreation]
}
