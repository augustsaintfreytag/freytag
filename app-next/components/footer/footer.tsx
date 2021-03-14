import { FunctionComponent } from "react"
import FooterSection, { FooterItem } from "~/components/footer/components/footer-section/footer-section"
import styles from "./footer.module.sass"

enum SpriteHref {
	Broadcast = "#Broadcast Symbol",
	Map = "#Map Symbol",
	Vimeo = "#Vimeo Symbol",
	GitLab = "#GitLab Symbol",
	Twitter = "#Twitter Symbol",
	Medium = "#Medium Symbol"
}

const Footer: FunctionComponent = () => (
	<footer className={styles.footer}>
		<div className={styles.inlay}>
			<FooterSection header="Me">
				<FooterItem sprite={SpriteHref.Broadcast} text="me@augustfreytag.com" />
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
				<FooterItem text="Home" link="/" />
				<FooterItem text="Life" link="/life" />
				<FooterItem text="Work" link="/work" />
				<FooterItem text="Imprint" link="/imprint" />
			</FooterSection>
			<FooterSection header="Further">
				<FooterItem sprite={SpriteHref.Vimeo} text="Vimeo" link="https://vimeo.com/apricum" />
				<FooterItem sprite={SpriteHref.GitLab} text="GitLab" link="https://gitlab.com/apricum" />
				<FooterItem sprite={SpriteHref.Twitter} text="Twitter" link="https://twitter.com/augustfreytag" />
				<FooterItem sprite={SpriteHref.Medium} text="Medium" link="https://medium.com/@augustfreytag" />
			</FooterSection>
		</div>
	</footer>
)

export default Footer
