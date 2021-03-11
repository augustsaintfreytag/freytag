import Link from "next/link"
import { FunctionComponent } from "react"
import { headerText } from "~/utils/brand/functions/brand-text"
import { PropsWithAnyChildren, PropsWithHref } from "~/utils/framework/library/components"
import styles from "./header.module.sass"

// Navigation Item Component

type NavListItemProps = PropsWithHref & PropsWithAnyChildren

const NavListItem: FunctionComponent<NavListItemProps> = props => {
	return (
		<li className={styles.navigationItem}>
			<Link href={props.href}>{props.children}</Link>
		</li>
	)
}

// Header Component

type Props = {
	showsBrand: boolean
}

const { title: titleText, descriptor: descriptorText } = headerText()

const Header: FunctionComponent<Props> = props => (
	<header className={styles.header}>
		<div className={styles.inlay}>
			<section className={styles.brand}>
				{props.showsBrand && (
					<>
						<h1 className={styles.title}>{titleText}</h1>
						<div className={styles.descriptors}>{descriptorText}</div>
					</>
				)}
			</section>

			<nav className={styles.navigation}>
				<ol>
					<NavListItem href="/">Home</NavListItem>
					<NavListItem href="/life">Life</NavListItem>
					<NavListItem href="/work">Work</NavListItem>
					<NavListItem href="/imprint">Imprint</NavListItem>
				</ol>
			</nav>
		</div>
	</header>
)

export default Header
