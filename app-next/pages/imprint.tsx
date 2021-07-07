import { GetServerSideProps } from "next"
import { getServerSideApiResponse } from "~/api/props/functions/server-side-props"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import Divider from "~/components/divider/divider"
import ImageCover from "~/components/image-cover/image-cover"
import ImprintMeta from "~/components/imprint/imprint-meta"
import {
	LegalContactBlock,
	LegalHeadingBlock,
	LegalSubHeadingBlock,
	LegalTextBlock
} from "~/components/legal/legal-article-blocks/legal-article-blocks"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page, PageProps } from "~/types/page"
import { useSensitiveDataDisplay } from "~/utils/render/sensitive-data-hook"
import { URL } from "~/utils/routing/library/url"
import styles from "./imprint-page.module.sass"

// Library

interface PageData {
	preview?: URL
	cover?: URL
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async () =>
	getServerSideApiResponse(pageGraphicsFromApi, pageGraphics => ({
		preview: pageGraphics.imprintAsset?.path,
		cover: pageGraphics.imprintAsset?.path
	}))

const ImprintPage: Page<PageProps & Props> = props => {
	const shouldDisplaySensitiveData = useSensitiveDataDisplay()

	return (
		<>
			<ImprintMeta previewAsset={props.data?.preview} />
			<section className={styles.page}>
				<h1>Imprint</h1>
				<ImageCover
					src={props.data?.cover}
					description="A stack of legal documents in a top-down view, 
						the top-most document showing an invoice for legal services, one of which is 
						writing a privacy policy, racking up a total bill of $15,950."
				/>
				<article>
					<LegalHeadingBlock heading="Legal Disclosure" aside={<>Information in accordance with Section&nbsp;5&nbsp;TMG</>} />
					<LegalSubHeadingBlock heading="Contact Information" />
					<LegalContactBlock decoded={shouldDisplaySensitiveData} />
					<LegalSubHeadingBlock heading="Disclaimer" />
					<LegalTextBlock heading="Accountability for Content">
						<p>
							The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or
							topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this matter,
							please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances
							pointing to illegal activity. Our obligations to remove or block the use of information under generally applicable laws remain
							unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
						</p>
					</LegalTextBlock>
					<LegalTextBlock heading="Accountability for Links">
						<p>
							Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No
							violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective
							link immediately.
						</p>
					</LegalTextBlock>
					<LegalTextBlock heading="Copyright">
						<p>
							Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilising,
							reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of
							the rights. Individual reproductions of a work are only allowed for private use. The materials from these pages are copyrighted and any
							unauthorised use may violate copyright laws.
						</p>
					</LegalTextBlock>
					<LegalTextBlock>
						<p>Provided by: translate-24h.de</p>
					</LegalTextBlock>
				</article>
				<Divider />
				<article lang="de-DE">
					<LegalHeadingBlock heading="Impressum" aside={<>Angaben gemäß §5&nbsp;TMG</>} />
					<LegalContactBlock decoded={shouldDisplaySensitiveData} />
					<LegalTextBlock heading="Haftung für Inhalte">
						<p>
							Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
							§§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
							überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
						</p>
					</LegalTextBlock>
					<LegalTextBlock heading="Haftung für Verlinkungen">
						<p>
							Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
							fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
							Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
							Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
							konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
							umgehend entfernen.
						</p>
					</LegalTextBlock>
					<LegalTextBlock heading="Urheberrecht">
						<p>
							Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
							Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
							schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht
							kommerziellen Gebrauch gestattet.
						</p>
						<p>
							Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
							Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
							entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
						</p>
					</LegalTextBlock>
					<LegalTextBlock>
						<p>Bereitgestellt von: translate-24h.de</p>
					</LegalTextBlock>
				</article>
			</section>
		</>
	)
}

ImprintPage.layout = DefaultLayout

export default ImprintPage
