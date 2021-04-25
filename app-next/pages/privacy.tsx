import ImageCover from "~/components/image-cover/image-cover"
import {
	LegalContactBlock,
	LegalHeadingBlock,
	LegalSubHeadingBlock,
	LegalTextBlock
} from "~/components/legal/legal-article-blocks/legal-article-blocks"
import ExternalLink from "~/components/link/components/external-link"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page } from "~/types/page"
import { useSensitiveDataDisplay } from "~/utils/render/sensitive-data-hook"
import styles from "./privacy-page.module.sass"

const PrivacyPage: Page = () => {
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
				<LegalHeadingBlock heading="Privacy Policy" aside="By Regulation (EU) 2016/679 (GDPR)" />
				<LegalTextBlock>
					<p>The responsible party by data protection laws, including the European Union General Data Protection Regulation (GDPR), is:</p>
				</LegalTextBlock>
				<LegalContactBlock decoded={shouldDisplaySensitiveData} />
				<LegalSubHeadingBlock heading="Your Data Subject Rights" />
				<LegalTextBlock>
					<p>You can exercise the following rights at any time using the contact details provided by our data protection officer:</p>
					<ul>
						<li>Information about your data stored by us and its processing (Art. 15 GDPR)</li>
						<li>Correction of incorrect personal data (Art. 16 GDPR)</li>
						<li>Deletion of your data stored by us (Art. 17 GDPR)</li>
						<li>Restriction of data processing if we are not yet allowed to delete your data due to legal obligations (Art. 18 GDPR)</li>
						<li>Objection to the processing of your data by us (Art. 21 GDPR)</li>
						<li>Data portability, provided you have consented to the data processing or have concluded a contract with us (Art. 20 GDPR)</li>
					</ul>
					<p>
						If you have given us consent, you can revoke this at any time with effect for the future. You can lodge a complaint with a supervisory
						authority at any time, e.g. the respective supervisory authority in the federal state of your residence or the authority responsible for
						us as the responsible body. A list of the supervisory authorities (for the non-public sector) with addresses can be found at the&nbsp;
						<ExternalLink href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">BfDI</ExternalLink>.
					</p>
				</LegalTextBlock>
				<LegalTextBlock heading="Purpose and Method of Data Processing">
					<p>
						When you access our website, i.e. if you do not register or otherwise submit information, information of a general nature is automatically
						collected. This information (server log files) includes, for example, the type of web browser, the operating system used, the domain name
						of your internet service provider, your IP address and the like.
					</p>
					<p>In particular, they are processed for the following purposes:</p>
					<ul>
						<li>Ensuring an error-free connection to the website</li>
						<li>Ensuring an error-free use of and interaction with the website</li>
						<li>Evaluation of system security and stability</li>
						<li>Administrative purposes</li>
					</ul>
					<p>
						We do not use your data to draw conclusions about your person. Information of this kind may be statistically evaluated by us in order to
						optimise our website and the technology behind it.
					</p>
				</LegalTextBlock>
				<LegalTextBlock heading="Legal Basis">
					<p>
						The processing is carried out in accordance with Art. 6 para. 1 lit. f DSGVO on the basis of our legitimate interest in improving the
						stability and functionality of our website.
					</p>
				</LegalTextBlock>
				<LegalTextBlock heading="Recipients">
					<p>
						Recipients of the data may be technical service providers who act as order processors for the operation and maintenance of our website.
					</p>
				</LegalTextBlock>
				<LegalTextBlock heading="Storage Period">
					<p>
						The data is deleted as soon as it is no longer required for the purpose for which it was collected. For data used to provide the website,
						this is generally the case when the respective session has ended.
					</p>
				</LegalTextBlock>
				<LegalTextBlock heading="Provision Prescribed or Required">
					<p>
						The provision of the aforementioned personal data is neither legally nor contractually required. However, without the IP address, the
						service and functionality of our website cannot be guaranteed. In addition, individual services and services may not be available or may
						be restricted. For this reason, an objection is excluded.
					</p>
				</LegalTextBlock>
				<LegalSubHeadingBlock heading="Vimeo" />
				<LegalTextBlock>
					<p>
						Plugins of the video portal Vimeo of Vimeo, LLC, 555 West 18th Street, New York, New York 10011, USA are integrated on our website. Each
						time you visit a page that offers one or more Vimeo video clips, a direct connection is established between your browser and a Vimeo
						server in the USA. Information about your visit and your IP address are stored there. Through interactions with the Vimeo plugins (e.g.
						clicking the start button), this information is also transmitted to Vimeo and stored there. You can find a full version of
						privacy-relevant information in Vimeo's privacy policy.
					</p>
					<p>
						If you have a Vimeo user account and do not want Vimeo to collect data about you via this website and link it to your membership data
						stored with Vimeo, you must log out of Vimeo before visiting this website.
					</p>
					<p>
						In addition, Vimeo calls up the Google Analytics tracker via an iFrame in which the video is called up. This is Vimeo's own tracking, to
						which we have no access. You can prevent tracking by Google Analytics by using the deactivation tools that Google offers for some Internet
						browsers. You can also prevent the collection of data generated by Google Analytics and related to your use of the website (including your
						IP address) by Google, as well as the processing of this data by Google, by downloading and installing the browser plugin available at the
						following link: <ExternalLink href="http://tools.google.com/dlpage/gaoptout">tools.google.com/dlpage/gaoptout</ExternalLink>.
					</p>
				</LegalTextBlock>
				<LegalSubHeadingBlock heading="SSL Encryption" />
				<LegalTextBlock>
					<p>To protect the security of your data during transmission, we use state-of-the-art encryption procedures (e.g. SSL) via HTTPS.</p>
				</LegalTextBlock>
				<LegalSubHeadingBlock heading="Changes to our Policy" />
				<LegalTextBlock>
					<p>
						We reserve the right to adapt this data protection declaration so that it always complies with the current legal requirements or in order
						to implement changes to our services in the data protection declaration, e.g. when introducing new services. The new data protection
						statement will then apply to your next visit.
					</p>
				</LegalTextBlock>
				<LegalSubHeadingBlock heading="Questions to the Data Protection Officer" />
				<LegalTextBlock>
					<p>If you have any questions about data protection, please contact the owner and operator of the site directly.</p>
				</LegalTextBlock>
			</article>
		</section>
	)
}

PrivacyPage.layout = DefaultLayout

export default PrivacyPage
