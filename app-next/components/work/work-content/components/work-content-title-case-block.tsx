import { FunctionComponent } from "react"
import { assetUrlFromComponent } from "~/api/records/asset/functions/image-source-provider"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import ViewportImage from "~/components/asset-image/viewport-image"
import CallToAction from "~/components/call-to-action/call-to-action"
import Markdown from "~/components/markdown/markdown"
import { URL, URLComponent } from "~/utils/routing/library/url"
import styles from "./work-content-title-case-block.module.sass"

export interface Props {
	heading: string
	subHeading?: string
	cover?: URLComponent
	callToAction?: {
		link: URL
		label: string
	}
}

const WorkContentTitleCaseBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<div className={styles.cover}>
			<div className={styles.inlay}>
				<ViewportImage className={styles.image} src={props.cover} format={{ size: AssetImageSize.Large }} />
			</div>
		</div>
		<h2 className={styles.heading}>{props.heading}</h2>
		<div className={styles.subHeading}>
			<Markdown>{props.subHeading}</Markdown>
		</div>
		{props.callToAction && (
			<CallToAction
				name={`${props.heading}, ${props.callToAction.label}`}
				className={styles.callToAction}
				href={assetUrlFromComponent(props.callToAction.link)}
				text={props.callToAction.label}
			/>
		)}
	</section>
)

export default WorkContentTitleCaseBlock
