import { FunctionComponent, useMemo } from "react"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import styles from "./work-content-closure-block.module.sass"

export interface Props {
	metadata?: {
		created?: Date
		modified?: Date
	}
}

const WorkContentClosureBlock: FunctionComponent<Props> = props => {
	const formattedMetadata = useMemo(() => {
		const { created, modified } = props.metadata ?? {}

		return {
			created: created && formattedDate(created, DateFormatStyle.MonthAndYear),
			modified: modified && formattedDate(modified, DateFormatStyle.MonthAndYear)
		}
	}, [props.metadata?.created, props.metadata?.modified])

	return (
		<section className={styles.block}>
			{!formattedMetadata.created && <p>Published by August Saint Freytag.</p>}
			{formattedMetadata.created && <p>Initially published {formattedMetadata.created} by August Saint Freytag.</p>}
		</section>
	)
}

export default WorkContentClosureBlock
