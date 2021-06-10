import { FunctionComponent, useMemo } from "react"
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
	<ExternalLink href="https://twitter.com/augustfreytag">
		<Sprite className={styles.socialSprite} href="#Twitter Symbol" /> Twitter
	</ExternalLink>
)

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
			{!formattedMetadata.created && <div>Published by August Saint Freytag.</div>}
			{formattedMetadata.created && <div>Initially published {formattedMetadata.created} by August Saint Freytag.</div>}
			<div>
				Follow on <Twitter /> to get notified on new publications and updates.
			</div>
		</section>
	)
}

export default WorkContentClosureBlock
