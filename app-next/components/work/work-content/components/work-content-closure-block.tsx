import { FunctionComponent, useMemo } from "react"
import ContentClosure from "~/components/content-closure/content-closure"
import ExternalLink from "~/components/link/external-link"
import Sprite from "~/components/sprites/sprite"
import Typo from "~/components/typo/typo"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import styles from "./work-content-closure-block.module.sass"

// Library

interface MetadataDate {
	value: Date
	description: string
}

// Components

const Twitter: FunctionComponent = () => (
	<ExternalLink href="https://twitter.com/augustfreytag" name="Twitter Link" context="Work Content Closure">
		<Sprite className={styles.socialSprite} href="#Twitter Symbol" /> Twitter
	</ExternalLink>
)

// Block

export interface Props {
	metadata?: {
		created?: Date
		modified?: Date
	}
}

const WorkContentClosureBlock: FunctionComponent<Props> = props => {
	const { created, modified } = useMemo<{ created?: MetadataDate; modified?: MetadataDate }>(() => {
		const { created, modified } = props.metadata ?? {}

		return {
			created: created && { value: created, description: formattedDate(created, DateFormatStyle.MonthAndYear) },
			modified: modified && { value: modified, description: formattedDate(modified, DateFormatStyle.MonthAndYear) }
		}
	}, [props.metadata?.created, props.metadata?.modified])

	const Time = (created: MetadataDate) => <time dateTime={created.value.toISOString()}>{created.description}</time>

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
