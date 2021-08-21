import Link from "next/link"
import { FunctionComponent, ReactElement } from "react"
import ExternalLink from "~/components/link/external-link"
import Sprite from "~/components/sprites/sprite"
import { PropsWithAnyChildren } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { HrefProperties, hrefProperties } from "~/utils/routing/functions/formatted-href"
import { URL } from "~/utils/routing/library/url"
import styles from "./footer-section.module.sass"

// Footer Item

interface FooterItemProps {
	sprite?: string
	text: string | ReactElement
	href?: URL
	active?: boolean
	name?: string
}

type FooterItemLinkProps = PropsWithAnyChildren & {
	href: URL
	external?: boolean
	name?: string
}

function hrefPropertiesFromProps(url: URL | undefined): HrefProperties | undefined {
	if (!url) {
		return undefined
	}

	return hrefProperties(url)
}

const FooterItemLink: FunctionComponent<FooterItemLinkProps> = props => {
	if (props.external) {
		return (
			<ExternalLink href={props.href} name={props.name} context="Footer Item">
				{props.children}
			</ExternalLink>
		)
	}

	return (
		<Link href={props.href}>
			<a>{props.children}</a>
		</Link>
	)
}

export const FooterItem: FunctionComponent<FooterItemProps> = props => {
	const linkProperties = hrefPropertiesFromProps(props.href)

	if (!linkProperties) {
		return (
			<div className={styles.footerItem}>
				<div className={className(styles.inlay)}>
					{props.sprite && <Sprite className={styles.sprite} href={props.sprite} />}
					<div className={styles.text}>{props.text}</div>
				</div>
			</div>
		)
	}

	return (
		<div className={className(styles.footerItem, props.active && styles.active)}>
			<FooterItemLink name={`${props.name} Link`} href={linkProperties.href} external={linkProperties.isExternal}>
				<div className={className(styles.inlay)}>
					{props.sprite && <Sprite className={styles.sprite} href={props.sprite} />}
					<div className={styles.text}>{props.text}</div>
					<div className={styles.link}>{linkProperties.text}</div>
				</div>
			</FooterItemLink>
		</div>
	)
}

// Footer Section

type FooterItemElement = ReactElement<FooterItemProps>

interface FooterSectionProps {
	header: string
	children: FooterItemElement | FooterItemElement[]
}

const FooterSection: FunctionComponent<FooterSectionProps> = props => (
	<section className={styles.footerSection}>
		<header>
			<h2 className={styles.footerHeader}>{props.header}</h2>
		</header>
		<main>{props.children}</main>
	</section>
)

export default FooterSection
