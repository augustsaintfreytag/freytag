import { FunctionComponent } from "react"
import CallToAction from "~/components/call-to-action/call-to-action"
import Markdown from "~/components/markdown/markdown"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-content-title-case-block.module.sass"

export interface Props {
	heading: string
	subHeading?: string
	image?: URL
	callToAction?: {
		link: URL
		label: string
	}
}

const WorkContentTitleCaseBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<div className={styles.image}>
			<img src={props.image} />
		</div>
		<h2 className={styles.heading}>{props.heading}</h2>
		<div className={styles.subHeading}>
			<Markdown>{props.subHeading}</Markdown>
		</div>
		{props.callToAction && (
			<CallToAction
				name={`${props.heading}, ${props.callToAction.label}`}
				className={styles.callToAction}
				href={props.callToAction.link}
				text={props.callToAction.label}
			/>
		)}
	</section>
)

export default WorkContentTitleCaseBlock
