import { FunctionComponent } from "react"
import ContactBlock from "~/components/contact-block/contact-block"
import ImageCover from "~/components/image-cover/image-cover"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page } from "~/types/page"
import { PropsWithAnyChildren } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { useSensitiveDataDisplay } from "~/utils/render/sensitive-data-hook"
import styles from "./imprint-page.module.sass"

// Subcomponents

const ImprintHeadingBlock: FunctionComponent<{ heading: string; aside: string }> = props => (
	<div className={className(styles.block, styles.headingBlock)}>
		<h2 className={styles.heading}>{props.heading}</h2>
		<aside>{props.aside}</aside>
	</div>
)

const ImprintSubHeadingBlock: FunctionComponent<{ heading: string }> = props => (
	<div className={className(styles.block, styles.subHeadingBlock)}>
		<h3 className={styles.subHeading}>{props.heading}</h3>
	</div>
)

const ImprintTextBlock: FunctionComponent<PropsWithAnyChildren & { heading?: string }> = props => (
	<div className={className(styles.block, styles.textBlock)}>
		{props.heading && <h4 className={styles.subHeading}>{props.heading}</h4>}
		{props.children}
	</div>
)

const ImprintContactBlock: FunctionComponent<{ decoded: boolean }> = props => (
	<ContactBlock className={className(styles.block, styles.contactBlock)} decoded={props.decoded} />
)

// Page

const ImprintPage: Page = () => {
	const shouldDisplaySensitiveData = useSensitiveDataDisplay()

	return (
		<section className={styles.page}>
			<ImageCover
				src="/assets/privacy-cover.jpg"
				description="A stack of legal documents in a top-down view, 
						the top-most document showing an invoice for legal services, one of which is 
						writing a privacy policy, racking up a total bill of $15,950."
			/>
			<article>
				<ImprintHeadingBlock heading="Legal Disclosure" aside="Information in accordance with Section 5 TMG" />
				<ImprintSubHeadingBlock heading="Contact Information" />
				<ImprintContactBlock decoded={shouldDisplaySensitiveData} />
				<ImprintSubHeadingBlock heading="Disclaimer" />
				<ImprintTextBlock heading="Accountability for Content">
					<p>
						The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or
						topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this matter,
						please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances
						pointing to illegal activity. Our obligations to remove or block the use of information under generally applicable laws remain unaffected
						by this as per §§ 8 to 10 of the Telemedia Act (TMG).
					</p>
				</ImprintTextBlock>
				<ImprintTextBlock heading="Accountability for Links">
					<p>
						Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No
						violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link
						immediately.
					</p>
				</ImprintTextBlock>
				<ImprintTextBlock heading="Copyright">
					<p>
						Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilising,
						reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the
						rights. Individual reproductions of a work are only allowed for private use. The materials from these pages are copyrighted and any
						unauthorised use may violate copyright laws.
					</p>
				</ImprintTextBlock>
				<ImprintTextBlock>
					<p>Provided by: translate-24h.de</p>
				</ImprintTextBlock>
			</article>
			<article>
				<ImprintHeadingBlock heading="Impressum" aside="Angaben gemäß §5 TMG" />
				<ImprintContactBlock decoded={shouldDisplaySensitiveData} />
				<ImprintTextBlock heading="Haftung für Inhalte">
					<p>
						Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
						§§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
						oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
					</p>
				</ImprintTextBlock>
				<ImprintTextBlock heading="Haftung für Verlinkungen">
					<p>
						Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
						fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
						Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
						Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
						konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
						entfernen.
					</p>
				</ImprintTextBlock>
				<ImprintTextBlock heading="Urheberrecht">
					<p>
						Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
						Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
						jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
					</p>
					<p>
						Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
						Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
						entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
					</p>
				</ImprintTextBlock>
			</article>
		</section>
	)
}

ImprintPage.layout = DefaultLayout

export default ImprintPage
