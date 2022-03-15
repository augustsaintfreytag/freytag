import { FunctionComponent } from "react"
import { dateFromTimestamp } from "~/api/cockpit/data/functions/date-conversion"
import { Theme } from "~/api/cockpit/records/themes/library/theme"
import ContentClosure from "~/components/content-closure/content-closure"
import ExternalTwitterLink from "~/components/link/external-twitter-link"
import Time, { TimeProperties } from "~/components/time/time"
import Typo from "~/components/typo/typo"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"

// Components

const Twitter = () => <ExternalTwitterLink context="Theme Closure" />

// Closure

interface Props {
	theme: Theme
}

const ThemeClosure: FunctionComponent<Props> = props => {
	const creationDate = dateFromTimestamp(props.theme._created)
	const creationTimeProperties: TimeProperties = { value: creationDate, description: formattedDate(creationDate, DateFormatStyle.MonthAndYear) }

	return (
		<ContentClosure>
			<div>
				<Typo>
					Theme created and compiled <Time {...creationTimeProperties} /> by August Saint Freytag.
				</Typo>
			</div>
			<div>
				<Typo>
					Follow on <Twitter /> to get notified of new publications and updates.
				</Typo>
			</div>
		</ContentClosure>
	)
}

export default ThemeClosure
