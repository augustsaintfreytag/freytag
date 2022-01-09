import Link from "next/link"
import { FunctionComponent } from "react"
import { brandDescriptor, brandTitle } from "~/components/meta/components/brand-meta-data"
import { PropsWithAnyChildren, PropsWithHref } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./header.module.sass"

// Navigation Item Component

type NavigationListItemProps = PropsWithHref &
	PropsWithAnyChildren & {
		active?: boolean
	}

const NavigationListItem: FunctionComponent<NavigationListItemProps> = props => {
	const isActive = props.active ?? false

	return (
		<li className={className(styles.navigationItem, isActive && styles.active)}>
			<Link href={props.href}>
				<a>{props.children}</a>
			</Link>
		</li>
	)
}

// Header Component

interface Props {
	activeRoute?: URL
	showsBrand: boolean
}

interface NavigationDefinition {
	href: URL
	description: string
}

const navigationDefinitions: NavigationDefinition[] = [
	{ href: "/", description: "Home" },
	{ href: "/life", description: "Life" },
	{ href: "/work", description: "Work" },
	{ href: "/imprint", description: "Imprint" }
]

const Header: FunctionComponent<Props> = props => {
	return (
		<header className={styles.header}>
			<div className={styles.inlay}>
				<section className={styles.brand}>
					{props.showsBrand && (
						<>
							<h1 className={styles.title}>{brandTitle()}</h1>
							<div className={styles.descriptors}>{brandDescriptor()}</div>
						</>
					)}
				</section>

				<nav className={styles.navigation}>
					<ol>
						{navigationDefinitions.map(definition => {
							const isActiveRoute = props.activeRoute === definition.href

							return (
								<NavigationListItem key={definition.href} href={definition.href} active={isActiveRoute}>
									{definition.description}
								</NavigationListItem>
							)
						})}
					</ol>
				</nav>
			</div>
		</header>
	)
}

export default Header
