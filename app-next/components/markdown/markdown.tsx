import { FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"

// Component

type Props = {
	text?: string
}

const Markdown: FunctionComponent<Props> = props => {
	return <ReactMarkdown children={props.text ?? ""} />
}

export default Markdown
