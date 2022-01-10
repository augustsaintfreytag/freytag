import { FunctionComponent } from "react"
import { contentAnchorIdFromText } from "~/components/content-anchor/functions/content-anchor-form"
import styles from "./content-anchor.module.sass"

type Props = {
	anchor: string
}

const ContentAnchor: FunctionComponent<Props> = props => {
	const identifier = contentAnchorIdFromText(props.anchor)
	return <span className={styles.anchor} id={identifier}></span>
}

export default ContentAnchor
