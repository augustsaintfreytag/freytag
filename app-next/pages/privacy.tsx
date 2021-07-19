import { GetServerSideProps } from "next"
import { getServerSideApiResponse } from "~/api/props/functions/server-side-props"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import Divider from "~/components/divider/divider"
import ImageCover from "~/components/image-cover/image-cover"
import {
	LegalContactBlock,
	LegalHeadingBlock,
	LegalLink,
	LegalParagraph,
	LegalSubHeadingBlock,
	LegalTextBlock
} from "~/components/legal/legal-article-blocks/legal-article-blocks"
import PrivacyMeta from "~/components/privacy/privacy-meta"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page, PageProps } from "~/types/page"
import { useSensitiveDataDisplay } from "~/utils/render/sensitive-data-hook"
import { URL } from "~/utils/routing/library/url"
import styles from "./privacy-page.module.sass"

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
		preview: pageGraphics.privacyAsset?.path,
		cover: pageGraphics.privacyAsset?.path
	}))

const PrivacyPage: Page<PageProps & Props> = props => {
	const shouldDisplaySensitiveData = useSensitiveDataDisplay()

	return (
		<>
			<PrivacyMeta previewAsset={props.data?.preview} />
			<section className={styles.page}>
				<h1>Privacy</h1>
				<ImageCover src={props.data?.cover} />
				<article>
					<LegalHeadingBlock heading="Privacy Policy" aside="By Regulation (EU) 2016/679 (GDPR)" />
					<LegalTextBlock>
						<LegalParagraph>
							The responsible party by data protection laws, including the <br />
							European Union General Data Protection Regulation is:
						</LegalParagraph>
					</LegalTextBlock>
					<LegalContactBlock decoded={shouldDisplaySensitiveData} />
					<LegalSubHeadingBlock heading="Your Data Subject Rights" />
					<LegalTextBlock>
						<LegalParagraph>
							You can exercise the following rights at any time using the contact details provided by our data protection officer:
						</LegalParagraph>
						<ul>
							<li>Information about your data stored by us and its processing (Art. 15 GDPR)</li>
							<li>Correction of incorrect personal data (Art. 16 GDPR)</li>
							<li>Deletion of your data stored by us (Art. 17 GDPR)</li>
							<li>Restriction of data processing if we are not yet allowed to delete your data due to legal obligations (Art. 18 GDPR)</li>
							<li>Objection to the processing of your data by us (Art. 21 GDPR)</li>
							<li>Data portability, provided you have consented to the data processing or have concluded a contract with us (Art. 20 GDPR)</li>
						</ul>
						<LegalParagraph>
							If you have given us consent, you can revoke this at any time with effect for the future. You can lodge a complaint with a supervisory
							authority at any time, e.g. the respective supervisory authority in the federal state of your residence or the authority responsible for
							us as the responsible body. A list of the supervisory authorities (for the non-public sector) with addresses can be found at the&nbsp;
							<LegalLink href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">BfDI</LegalLink>.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Purpose and Method of Data Processing">
						<LegalParagraph>
							When you access our website, i.e. if you do not register or otherwise submit information, information of a general nature is
							automatically collected. This information (server log files) includes, for example, the type of web browser, the operating system used,
							the domain name of your internet service provider, your IP address and the like.
						</LegalParagraph>
						<LegalParagraph>In particular, they are processed for the following purposes:</LegalParagraph>
						<ul>
							<li>Ensuring an error-free connection to the website</li>
							<li>Ensuring an error-free use of and interaction with the website</li>
							<li>Evaluation of system security and stability</li>
							<li>Administrative purposes</li>
						</ul>
						<LegalParagraph>
							We do not use your data to draw conclusions about your person. Information of this kind may be statistically evaluated by us in order to
							optimise our website and the technology behind it.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Legal Basis">
						<LegalParagraph>
							The processing is carried out in accordance with Art. 6 para. 1 lit. f DSGVO on the basis of our legitimate interest in improving the
							stability and functionality of our website.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Recipients">
						<LegalParagraph>
							Recipients of the data may be technical service providers who act as order processors for the operation and maintenance of our website.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Storage Period">
						<LegalParagraph>
							The data is deleted as soon as it is no longer required for the purpose for which it was collected. For data used to provide the
							website, this is generally the case when the respective session has ended.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Provision Prescribed or Required">
						<LegalParagraph>
							The provision of the aforementioned personal data is neither legally nor contractually required. However, without the IP address, the
							service and functionality of our website cannot be guaranteed. In addition, individual services and services may not be available or may
							be restricted. For this reason, an objection is excluded.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalSubHeadingBlock heading="Vimeo" />
					<LegalTextBlock>
						<LegalParagraph>
							Plugins of the video portal Vimeo of Vimeo, LLC, 555 West 18th Street, New York, New York 10011, USA are integrated on our website. Each
							time you visit a page that offers one or more Vimeo video clips, a direct connection is established between your browser and a Vimeo
							server in the USA. Information about your visit and your IP address are stored there. Through interactions with the Vimeo plugins (e.g.
							clicking the start button), this information is also transmitted to Vimeo and stored there. You can find a full version of
							privacy-relevant information in Vimeo's privacy policy.
						</LegalParagraph>
						<LegalParagraph>
							If you have a Vimeo user account and do not want Vimeo to collect data about you via this website and link it to your membership data
							stored with Vimeo, you must log out of Vimeo before visiting this website.
						</LegalParagraph>
						<LegalParagraph>
							In addition, Vimeo calls up the Google Analytics tracker via an iFrame in which the video is called up. This is Vimeo's own tracking, to
							which we have no access. You can prevent tracking by Google Analytics by using the deactivation tools that Google offers for some
							Internet browsers. You can also prevent the collection of data generated by Google Analytics and related to your use of the website
							(including your IP address) by Google, as well as the processing of this data by Google, by downloading and installing the browser
							plugin available through <LegalLink href="http://tools.google.com/dlpage/gaoptout">Google Analytics Opt-Out</LegalLink>.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalSubHeadingBlock heading="SSL Encryption" />
					<LegalTextBlock>
						<LegalParagraph>
							To protect the security of your data during transmission, we use state-of-the-art encryption procedures (e.g. SSL) via HTTPS.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalSubHeadingBlock heading="Changes to our Policy" />
					<LegalTextBlock>
						<LegalParagraph>
							We reserve the right to adapt this data protection declaration so that it always complies with the current legal requirements or in
							order to implement changes to our services in the data protection declaration, e.g. when introducing new services. The new data
							protection statement will then apply to your next visit.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalSubHeadingBlock heading="Questions to the Data Protection Officer" />
					<LegalTextBlock>
						<LegalParagraph>
							If you have any questions about data protection, please contact the owner and operator of the site directly.
						</LegalParagraph>
					</LegalTextBlock>
				</article>
				<Divider />
				<article lang="de-DE">
					<LegalHeadingBlock heading="Datenschutzerklärung" aside="Regulation (EU) 2016/679 (DSGVO)" />
					<LegalTextBlock>
						<LegalParagraph>
							Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der Datenschutzgrundverordnung der europäischen Union, ist:
						</LegalParagraph>
					</LegalTextBlock>
					<LegalContactBlock decoded={shouldDisplaySensitiveData} />
					<LegalSubHeadingBlock heading="Ihre Betroffenenrechte" />
					<LegalTextBlock>
						<LegalParagraph>
							Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:
						</LegalParagraph>
						<ul>
							<li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO)</li>
							<li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO)</li>
							<li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
							<li>
								Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO)
							</li>
							<li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO)</li>
							<li>
								Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20
								DSGVO)
							</li>
						</ul>
						<LegalParagraph>
							Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Sie können sich
							jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres
							Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde. Eine Liste der Aufsichtsbehörden (für den
							nichtöffentlichen Bereich) mit Anschrift finden Sie beim{" "}
							<LegalLink href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">BfDI</LegalLink>.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Art und Zweck der Verarbeitung">
						<LegalParagraph>
							Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen übermitteln, werden
							automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das
							verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches.
						</LegalParagraph>
						<LegalParagraph>Sie werden insbesondere zu folgenden Zwecken verarbeitet:</LegalParagraph>
						<ul>
							<li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website</li>
							<li>Sicherstellung einer reibungslosen Nutzung unserer Website</li>
							<li>Auswertung der Systemsicherheit und -stabilität</li>
							<li>Zu weiteren administrativen Zwecken</li>
						</ul>
						<LegalParagraph>
							Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Informationen dieser Art werden von uns ggfs. statistisch
							ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Rechtsgrundlage">
						<LegalParagraph>
							Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität
							und Funktionalität unserer Website.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Empfänger">
						<LegalParagraph>
							Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter
							tätig werden.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Speicherdauer">
						<LegalParagraph>
							Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr erforderlich sind. Dies ist für die Daten, die der
							Bereitstellung der Webseite dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung beendet ist.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalTextBlock heading="Bereitstellung vorgeschrieben oder erforderlich">
						<LegalParagraph>
							Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse
							ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne Dienste und Services nicht
							verfügbar oder eingeschränkt sein. Aus diesem Grund ist ein Widerspruch ausgeschlossen.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalSubHeadingBlock heading="Vimeo" />
					<LegalTextBlock>
						<LegalParagraph>
							Auf unserer Website sind Plugins des Videoportals Vimeo der Vimeo, LLC, 555 West 18th Street, New York, New York 10011, USA eingebunden.
							Bei jedem Aufruf einer Seite, die ein oder mehrere Vimeo-Videoclips anbietet, wird eine direkte Verbindung zwischen Ihrem Browser und
							einem Server von Vimeo in den USA hergestellt. Dabei werden Informationen über Ihren Besuch und Ihre IP-Adresse dort gespeichert. Durch
							Interaktionen mit den Vimeo Plugins (z.B. Klicken des Start-Buttons) werden diese Informationen ebenfalls an Vimeo übermittelt und dort
							gespeichert. Eine volle Ausführung Datenschutz-relevanter Informationen finden Sie in der Datenschutzerklärung von Vimeo.
						</LegalParagraph>
						<LegalParagraph>
							Wenn Sie ein Vimeo-Benutzerkonto haben und nicht möchten, dass Vimeo über diese Website Daten über Sie sammelt und mit Ihren bei Vimeo
							gespeicherten Mitgliedsdaten verknüpft, müssen Sie sich vor Ihrem Besuch dieser Website bei Vimeo ausloggen.
						</LegalParagraph>
						<LegalParagraph>
							Außerdem ruft Vimeo über einen iFrame, in dem das Video aufgerufen wird, den Tracker Google Analytics auf. Dabei handelt es sich um ein
							eigenes Tracking von Vimeo, auf das wir keinen Zugriff haben. Sie können das Tracking durch Google Analytics unterbinden, indem Sie die
							Deaktivierungs-Tools einsetzen, die Google für einige Internet-Browser anbietet. Sie können darüber hinaus die Erfassung der durch
							Google Analytics erzeugten und auf ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung
							dieser Daten durch Google verhindern, indem Sie das verfügbare Browser-Plugin herunterladen und installieren:{" "}
							<LegalLink href="http://tools.google.com/dlpage/gaoptout">Google Analytics Opt-Out</LegalLink>.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalSubHeadingBlock heading="SSL-Verschlüsselung" />
					<LegalTextBlock>
						<LegalParagraph>
							Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem aktuellen Stand der Technik entsprechende
							Verschlüsselungsverfahren (z. B. SSL) über HTTPS.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalSubHeadingBlock heading="Änderung unserer Datenschutzbestimmungen" />
					<LegalTextBlock>
						<LegalParagraph>
							Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um
							Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch
							gilt dann die neue Datenschutzerklärung.
						</LegalParagraph>
					</LegalTextBlock>
					<LegalSubHeadingBlock heading="Fragen an den Datenschutzbeauftragten" />
					<LegalTextBlock>
						<LegalParagraph>Wenn Sie Fragen zum Datenschutz haben, wenden Sie sich direkt an den Inhaber und Betreiber der Seite.</LegalParagraph>
					</LegalTextBlock>
				</article>
				<Divider />
				<aside>
					<LegalTextBlock>
						<LegalParagraph>
							The privacy policy was created with the help of <LegalLink href="https://www.activemind.de">activeMind AG</LegalLink>, the experts for
							external data protection officers (version 2019-04-10) and translated manually with the assistance of&nbsp;
							<LegalLink href="https://www.deepl.com">DeepL</LegalLink>.
						</LegalParagraph>
					</LegalTextBlock>
				</aside>
			</section>
		</>
	)
}

PrivacyPage.layout = DefaultLayout

export default PrivacyPage
