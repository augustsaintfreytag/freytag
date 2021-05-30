/** A sorting function for plugging into `sort` to order dates by timestamp value. */
export function dateSort(lhs: Date, rhs: Date) {
	const lhsv = lhs.valueOf()
	const rhsv = rhs.valueOf()

	if (lhsv > rhsv) {
		return 1
	}

	if (lhsv < rhsv) {
		return -1
	}

	return 0
}
