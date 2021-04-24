import { FunctionComponent } from "react"
import ContactBlock from "~/components/contact-block/contact-block"
import { PropsWithAnyChildren } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./legal-article-blocks.module.sass"

type ImprintHeadingBlockProps = { heading: string; aside: string }

export const LegalHeadingBlock: FunctionComponent<ImprintHeadingBlockProps> = props => (
	<div className={className(styles.block, styles.headingBlock)}>
		<h2 className={styles.heading}>{props.heading}</h2>
		<aside>{props.aside}</aside>
	</div>
)

type ImprintSubHeadingBlockProps = { heading: string }

export const LegalSubHeadingBlock: FunctionComponent<ImprintSubHeadingBlockProps> = props => (
	<div className={className(styles.block, styles.subHeadingBlock)}>
		<h3 className={styles.subHeading}>{props.heading}</h3>
	</div>
)

type ImprintTextBlockProps = PropsWithAnyChildren & { heading?: string }

export const LegalTextBlock: FunctionComponent<ImprintTextBlockProps> = props => (
	<div className={className(styles.block, styles.textBlock)}>
		{props.heading && <h4 className={styles.subHeading}>{props.heading}</h4>}
		{props.children}
	</div>
)

type ImprintContactBlockProps = { decoded: boolean }

export const LegalContactBlock: FunctionComponent<ImprintContactBlockProps> = props => (
	<ContactBlock className={className(styles.block, styles.contactBlock)} decoded={props.decoded} />
)
