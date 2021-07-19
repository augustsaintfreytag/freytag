import { FunctionComponent, ReactNode, ReactNodeArray } from "react"
import ContactBlock from "~/components/contact-block/contact-block"
import ExternalLink from "~/components/link/external-link"
import Typo from "~/components/typo/typo"
import { PropsWithAnyChildren } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./legal-article-blocks.module.sass"

type BlockContent = ReactNode | ReactNodeArray | string

interface ImprintHeadingBlockProps {
	heading: BlockContent
	aside: BlockContent
}

export const LegalHeadingBlock: FunctionComponent<ImprintHeadingBlockProps> = props => (
	<div className={className(styles.block, styles.headingBlock)}>
		<h2 className={styles.heading}>{props.heading}</h2>
		<div className={styles.headingSubtitle}>{props.aside}</div>
	</div>
)

interface ImprintSubHeadingBlockProps {
	heading: BlockContent
}

export const LegalSubHeadingBlock: FunctionComponent<ImprintSubHeadingBlockProps> = props => (
	<div className={className(styles.block, styles.subHeadingBlock)}>
		<h3 className={styles.subHeading}>{props.heading}</h3>
	</div>
)

interface ImprintTextBlockProps extends PropsWithAnyChildren {
	heading?: BlockContent
}

export const LegalTextBlock: FunctionComponent<ImprintTextBlockProps> = props => (
	<div className={className(styles.block, styles.textBlock)}>
		{props.heading && <h4 className={styles.subHeading}>{props.heading}</h4>}
		{props.children}
	</div>
)

export const LegalParagraph: FunctionComponent<PropsWithAnyChildren> = props => (
	<p>
		<Typo>{props.children}</Typo>
	</p>
)

export const LegalLink: FunctionComponent<PropsWithAnyChildren & { href: URL; unformatted?: boolean }> = props => (
	<ExternalLink className={className(styles.link, props.unformatted && styles.unformatted)} href={props.href}>
		{props.children}
	</ExternalLink>
)

interface ImprintContactBlockProps {
	decoded: boolean
}

export const LegalContactBlock: FunctionComponent<ImprintContactBlockProps> = props => (
	<ContactBlock className={className(styles.block, styles.contactBlock)} decoded={props.decoded} />
)
