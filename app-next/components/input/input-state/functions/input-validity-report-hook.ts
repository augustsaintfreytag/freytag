import { useState } from "react"
import { Dictionary } from "~/utils/types/library/dictionary"

export type ValidityRepresentation = boolean
export type ValidityReport = Dictionary<string, ValidityRepresentation>
export type SetValidityReportBlock = (identifier: string, state: ValidityRepresentation) => void
export type AllValidBlock = () => boolean

export function useInputValidityReport(): [ValidityReport, SetValidityReportBlock, AllValidBlock] {
	const [report, setReport] = useState<ValidityReport>({})

	const reportValidity: SetValidityReportBlock = (identifier, state) => {
		const updatedReport = { ...report }
		updatedReport[identifier] = state

		setReport(updatedReport)
	}

	const reportAllValid: AllValidBlock = () => {
		for (const key in report) {
			if (!report[key]) {
				return false
			}
		}

		return true
	}

	return [report, reportValidity, reportAllValid]
}
