import { FunctionComponent } from "react"
import ImageCover from "~/components/image-cover/image-cover"
import ExternalLink from "~/components/link/external-link"
import InternalLink from "~/components/link/internal-link"
import TextLine from "~/components/text-line/text-line"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page } from "~/types/page"
import styles from "./404-page.module.sass"

// Sub Components

const Vimeo: FunctionComponent = () => <ExternalLink href="https://vimeo.com/apricum">Vimeo</ExternalLink>

const Error404Page: Page = () => {
	const coverImage = "/storage/uploads/2021/07/14/Cover-Shot-Ripped-Demult-D2-R4_uid_60eee5eecefef.jpg"

	return (
		<section className={styles.page}>
			<ImageCover src={coverImage} />
			<section className={styles.inlay}>
				<div>
					<TextLine>Some other places to start:</TextLine>
				</div>
				<div>
					<TextLine>
						View <InternalLink href="/life" /> events.
					</TextLine>
					<TextLine>
						View <InternalLink href="/work" /> showcases.
					</TextLine>
					<TextLine>
						View film and video work on <Vimeo />.
					</TextLine>
				</div>
			</section>
		</section>
	)
}

Error404Page.layout = DefaultLayout

export default Error404Page
