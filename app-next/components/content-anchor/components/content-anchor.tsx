import { forwardRef } from "react"
import { contentAnchorIdFromText } from "~/components/content-anchor/functions/content-anchor-form"
import styles from "./content-anchor.module.sass"

export type ContentAnchorElement = HTMLSpanElement

type Props = {
	anchor: string
}

const ContentAnchor = forwardRef<ContentAnchorElement, Props>((props, ref) => {
	const identifier = contentAnchorIdFromText(props.anchor)

	return (
		<span className={styles.enclosure}>
			<span className={styles.anchor} ref={ref} id={identifier}></span>
		</span>
	)
})

export default ContentAnchor
