import { FunctionComponent, useMemo } from "react"
import ContentClosure from "~/components/content-closure/content-closure"
import ExternalTwitterLink from "~/components/link/external-twitter-link"
import Time, { TimeProperties } from "~/components/time/time"
import Typo from "~/components/typo/typo"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import styles from "./work-content-closure-block.module.sass"

// Components

const Twitter = () => <ExternalTwitterLink context="Work Content Closure" />

// Closure

export interface Props {
	metadata?: {
		created?: Date
		modified?: Date
	}
}

const WorkContentClosureBlock: FunctionComponent<Props> = props => {
	const { created, modified } = useMemo<{ created?: TimeProperties; modified?: TimeProperties }>(() => {
		const { created, modified } = props.metadata ?? {}

		return {
			created: created && { value: created, description: formattedDate(created, DateFormatStyle.MonthAndYear) },
			modified: modified && { value: modified, description: formattedDate(modified, DateFormatStyle.MonthAndYear) }
		}
	}, [props.metadata?.created, props.metadata?.modified])

	return (
		<ContentClosure className={styles.closure}>
			{!created && <div>Published by August Saint Freytag.</div>}
			{created && (
				<div>
					<Typo>
						Initially published <Time {...created} /> by August Saint Freytag.
					</Typo>
				</div>
			)}
			<div>
				<Typo>
					Follow on <Twitter /> to get notified of new publications and updates.
				</Typo>
			</div>
		</ContentClosure>
	)
}

export default WorkContentClosureBlock
