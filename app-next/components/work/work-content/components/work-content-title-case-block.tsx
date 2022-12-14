import { FunctionComponent, useMemo } from "react"
import AssetImage from "~/components/asset-image/asset-image"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import CallToAction from "~/components/call-to-action/call-to-action"
import Markdown from "~/components/markdown/markdown"
import { className } from "~/utils/class-names/class-name"
import { URL, URLComponent } from "~/utils/routing/library/url"
import styles from "./work-content-title-case-block.module.sass"

// Child Components

const Heading: FunctionComponent<{ content: string }> = props => <h2 className={styles.heading}>{props.content}</h2>

const SubHeading: FunctionComponent<{ content: string }> = props => (
	<div className={styles.subHeading}>
		<Markdown>{props.content}</Markdown>
	</div>
)

const Cover: FunctionComponent<{ content: URLComponent }> = props => (
	<div className={styles.cover}>
		<div className={styles.inlay}>
			<AssetImage className={styles.image} src={props.content} format={{ size: AssetImageSize.Large }} />
		</div>
	</div>
)

// Component

export interface Props {
	heading?: string
	subHeading?: string
	cover?: URLComponent
	callToAction?: {
		href: URL
		label: string
	}
}

const WorkContentTitleCaseBlock: FunctionComponent<Props> = props => {
	const actionName = useMemo<string>(() => {
		if (!props.callToAction) {
			return "Unknown"
		}

		const context = props.heading ?? "Work"
		return `${context}, ${props.callToAction.label}`
	}, [])

	return (
		<div className={className(styles.block, (props.heading || props.subHeading) && styles.titled)}>
			{props.cover && <Cover content={props.cover} />}
			{props.heading && <Heading content={props.heading} />}
			{props.subHeading && <SubHeading content={props.subHeading} />}
			{props.callToAction && (
				<CallToAction name={actionName} className={styles.callToAction} href={props.callToAction.href} text={props.callToAction.label} />
			)}
		</div>
	)
}

export default WorkContentTitleCaseBlock
