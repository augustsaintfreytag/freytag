import { CockpitRecord } from "cockpit-access"
import { dateFromTimestamp } from "~/api/cockpit/data/functions/date-conversion"
import { dateSort } from "~/utils/date/functions/date-sorting"

// Record Sort

export function sortedRecords(records: CockpitRecord[]): CockpitRecord[] {
	return [...records].sort((lhs, rhs) => {
		const lhsv = dateFromTimestamp(lhs._created).valueOf()
		const rhsv = dateFromTimestamp(rhs._created).valueOf()

		if (lhsv < rhsv) {
			return 1
		}

		if (lhsv > rhsv) {
			return -1
		}

		return 0
	})
}

export function sortedTypedRecord<RecordType extends CockpitRecord>(records: RecordType[]): RecordType[] {
	return sortedRecords(records) as RecordType[]
}

// Record Date Sort

export function sortedRecordDates(records: CockpitRecord[]): Date[] {
	return records
		.map(record => {
			const timestamp = record._created
			const date = dateFromTimestamp(timestamp)

			return date
		})
		.sort(dateSort)
}
