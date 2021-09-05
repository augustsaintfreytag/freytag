import { FunctionComponent, useMemo } from "react"
import { assetUrlFromComponent } from "~/api/records/asset/functions/image-source-provider"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import ViewportImage from "~/components/asset-image/viewport-image"
import CallToAction from "~/components/call-to-action/call-to-action"
import Markdown from "~/components/markdown/markdown"
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
			<ViewportImage className={styles.image} src={props.content} format={{ size: AssetImageSize.Large }} />
		</div>
	</div>
)

// Component

export interface Props {
	heading?: string
	subHeading?: string
	cover?: URLComponent
	callToAction?: {
		link: URL
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
		<section className={styles.block}>
			{props.cover && <Cover content={props.cover} />}
			{props.heading && <Heading content={props.heading} />}
			{props.subHeading && <SubHeading content={props.subHeading} />}
			{props.callToAction && (
				<CallToAction
					name={actionName}
					className={styles.callToAction}
					href={assetUrlFromComponent(props.callToAction.link)}
					text={props.callToAction.label}
				/>
			)}
		</section>
	)
}

export default WorkContentTitleCaseBlock
