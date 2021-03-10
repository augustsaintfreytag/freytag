import Sprite from "@/components/sprites/sprite"
import { FunctionComponent, ReactElement } from "react"
import styles from "./footer-section.module.sass"

// Footer Item

type FooterItemProps = {
	sprite?: string
	text: string | ReactElement
	destination?: string
}

export const FooterItem: FunctionComponent<FooterItemProps> = props => {
	return (
		<div className={styles.footerItem}>
			{props.sprite && <Sprite className={styles.sprite} href={props.sprite} />}
			<div className={styles.text}>{props.text}</div>
			{props.destination && <div className={styles.destination}>{props.destination}</div>}
		</div>
	)
}

// Footer Section

type FooterItemElement = ReactElement<FooterItemProps>

type FooterSectionProps = {
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
