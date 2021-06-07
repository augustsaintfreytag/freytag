import { FunctionComponent, useMemo } from "react"
import FooterSection, { FooterItem } from "~/components/footer/components/footer-section/footer-section"
import { encoded } from "~/utils/address-obfuscator/functions/rot-13"
import { URL } from "~/utils/routing/library/url"
import styles from "./footer.module.sass"

enum SpriteHref {
	InternalLink = "#Internal Content Symbol",
	Broadcast = "#Broadcast Symbol",
	Map = "#Map Symbol",
	Vimeo = "#Vimeo Symbol",
	GitLab = "#GitLab Symbol",
	Twitter = "#Twitter Symbol",
	Medium = "#Medium Symbol"
}

interface NavigationDefinition {
	href: URL
	description: string
}

const navigationDefinitions: NavigationDefinition[] = [
	{ href: "/", description: "Home" },
	{ href: "/life", description: "Life" },
	{ href: "/work", description: "Work" },
	{ href: "/imprint", description: "Imprint" },
	{ href: "/privacy", description: "Privacy" }
]

const address = "me@augustfreytag.com"

interface Props {
	activeRoute?: URL
	decoded?: boolean
}

const Footer: FunctionComponent<Props> = props => {
	const isDecoded = props.decoded ?? false

	const codedAddress = useMemo<string>(() => {
		if (isDecoded) {
			return address
		}

		return encoded(address)
	}, [isDecoded])

	return (
		<footer className={styles.footer}>
			<div className={styles.inlay}>
				<FooterSection header="Me">
					<FooterItem sprite={SpriteHref.Broadcast} text={codedAddress} />
					<FooterItem
						sprite={SpriteHref.Map}
						text={
							<>
								The Heart of the Capital
								<br />
								Berlin, Germany
							</>
						}
					/>
				</FooterSection>
				<FooterSection header="Map">
					{navigationDefinitions.map(definition => {
						const isActiveRoute = definition.href === props.activeRoute

						return (
							<FooterItem
								key={definition.href}
								sprite={SpriteHref.InternalLink}
								text={definition.description}
								href={definition.href}
								active={isActiveRoute}
							/>
						)
					})}
				</FooterSection>
				<FooterSection header="Further">
					<FooterItem sprite={SpriteHref.Vimeo} text="Vimeo" href="https://vimeo.com/apricum" />
					<FooterItem sprite={SpriteHref.GitLab} text="GitLab" href="https://gitlab.com/apricum" />
					<FooterItem sprite={SpriteHref.Twitter} text="Twitter" href="https://twitter.com/augustfreytag" />
					<FooterItem sprite={SpriteHref.Medium} text="Medium" href="https://medium.com/@augustfreytag" />
				</FooterSection>
			</div>
		</footer>
	)
}

export default Footer
