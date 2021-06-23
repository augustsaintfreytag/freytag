import { FunctionComponent, useMemo } from "react"
import LineBreak from "~/components/line-break/line-break"
import ExternalLink from "~/components/link/external-link"
import Sprite from "~/components/sprites/sprite"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import styles from "./work-content-closure-block.module.sass"

export interface Props {
	metadata?: {
		created?: Date
		modified?: Date
	}
}

const Twitter: FunctionComponent = () => (
	<ExternalLink href="https://twitter.com/augustfreytag" name="Twitter Link" context="Work Content Closure">
		<Sprite className={styles.socialSprite} href="#Twitter Symbol" /> Twitter
	</ExternalLink>
)

const WorkContentClosureBlock: FunctionComponent<Props> = props => {
	const { created, modified } = useMemo(() => {
		const { created, modified } = props.metadata ?? {}

		return {
			created: created && { value: created, description: formattedDate(created, DateFormatStyle.MonthAndYear) },
			modified: modified && { value: modified, description: formattedDate(modified, DateFormatStyle.MonthAndYear) }
		}
	}, [props.metadata?.created, props.metadata?.modified])

	return (
		<section className={styles.block}>
			{!created && <div>Published by August Saint Freytag.</div>}
			{created && (
				<div>
					Initially published <time dateTime={created.value.toISOString()}>{created.description}</time> by August Saint Freytag.
				</div>
			)}
			<div>
				Follow on <Twitter /> to get notified of <LineBreak />
				new publications and updates.
			</div>
		</section>
	)
}

export default WorkContentClosureBlock
