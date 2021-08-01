import { FunctionComponent } from "react"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { useWorkShowcaseReleaseCycleDescription } from "~/components/work/work-closure/functions/work-showcase-release-cycle-description-hook"
import { denominatorDescription } from "~/utils/description/functions/denominator-description"
import styles from "./work-closure.module.sass"

interface Props {
	showcases: WorkShowcase[]
}

const WorkClosure: FunctionComponent<Props> = props => {
	const showcases = props.showcases ?? []
	const { lastShowcaseCreation, averageShowcaseCreation } = useWorkShowcaseReleaseCycleDescription(showcases)

	return (
		<aside className={styles.closure}>
			<div>
				There are <em>{denominatorDescription({ singular: "showcase", plural: "showcases" }, showcases.length)}</em> presented in total.
			</div>
			{lastShowcaseCreation && (
				<>
					{averageShowcaseCreation && (
						<div>
							A showcase is published on average every <em>{averageShowcaseCreation.description}</em>, last release on{" "}
							<em>{lastShowcaseCreation.description}</em>.
						</div>
					)}
					{!averageShowcaseCreation && (
						<div>
							Last showcase published on{" "}
							<em>
								<time dateTime={lastShowcaseCreation.value.toISOString()}>{lastShowcaseCreation.description}</time>
							</em>
							.
						</div>
					)}
				</>
			)}
		</aside>
	)
}

export default WorkClosure
