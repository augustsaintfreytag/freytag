import { FunctionComponent } from "react"

export interface TimeProperties {
	value: Date
	description: string
}

type Props = TimeProperties

const Time: FunctionComponent<Props> = props => <time dateTime={props.value.toISOString()}>{props.description}</time>

export default Time
