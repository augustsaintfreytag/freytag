import { FunctionComponent } from "react"
import { useRecordCreationStatistics } from "~/api/cockpit/records/statistics/functions/record-creation-statistics-hook"
import { WorkShowcase } from "~/api/cockpit/records/work-showcase/library/work-showcase"
import ContentClosure from "~/components/content-closure/content-closure"
import { denominatorDescription } from "~/utils/description/functions/denominator-description"

interface Props {
	showcases: WorkShowcase[]
}

const WorkClosure: FunctionComponent<Props> = props => {
	const { lastRecordCreation, averageRecordCreation } = useRecordCreationStatistics(props.showcases)

	return (
		<ContentClosure>
			<div>
				There are <em>{denominatorDescription({ singular: "showcase", plural: "showcases" }, props.showcases.length)}</em> presented in total.
			</div>
			{lastRecordCreation && (
				<>
					{averageRecordCreation && (
						<div>
							A showcase is published on average every <em>{averageRecordCreation.description}</em>, last release on{" "}
							<em>{lastRecordCreation.description}</em>.
						</div>
					)}
					{!averageRecordCreation && (
						<div>
							Last showcase published on{" "}
							<em>
								<time dateTime={lastRecordCreation.value.toISOString()}>{lastRecordCreation.description}</time>
							</em>
							.
						</div>
					)}
				</>
			)}
		</ContentClosure>
	)
}

export default WorkClosure
