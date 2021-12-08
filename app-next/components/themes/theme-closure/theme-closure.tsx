import { FunctionComponent } from "react"
import { useRecordCreationStatistics } from "~/api/records/statistics/functions/record-creation-statistics-hook"
import { Theme } from "~/api/records/themes/library/theme"
import ContentClosure from "~/components/content-closure/content-closure"

interface Props {
	themes: Theme[]
}

const ThemeClosure: FunctionComponent<Props> = props => {
	const { lastRecordCreation } = useRecordCreationStatistics(props.themes)

	return (
		<ContentClosure>
			<div>There are {props.themes.length} themes in the Studio.</div>
			<div>
				Last theme was created and published on{" "}
				<em>
					<time dateTime={lastRecordCreation?.value.toISOString()}>{lastRecordCreation?.description ?? "<Unknown>"}</time>
				</em>
				.
			</div>
		</ContentClosure>
	)
}

export default ThemeClosure
