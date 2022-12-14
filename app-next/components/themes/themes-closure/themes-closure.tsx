import { FunctionComponent } from "react"
import { useRecordCreationStatistics } from "~/api/cockpit/records/statistics/functions/record-creation-statistics-hook"
import { Theme } from "~/api/cockpit/records/themes/library/theme"
import ContentClosure from "~/components/content-closure/content-closure"
import Time from "~/components/time/time"

interface Props {
	themes: Theme[]
}

const ThemesClosure: FunctionComponent<Props> = props => {
	const { lastRecordCreation } = useRecordCreationStatistics(props.themes)

	return (
		<ContentClosure>
			<div>There are {props.themes.length} themes available in total.</div>
			{lastRecordCreation && (
				<div>
					Last theme was created and published on <Time {...lastRecordCreation} />.
				</div>
			)}
		</ContentClosure>
	)
}

export default ThemesClosure
