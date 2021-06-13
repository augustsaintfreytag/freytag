import { FunctionComponent } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { imageUrlFromComponent } from "~/api/records/asset/functions/image-source-provider"
import ImageCover from "~/components/image-cover/image-cover"
import InternalLink from "~/components/link/internal-link"
import TextLine from "~/components/text-line/text-line"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page } from "~/types/page"
import styles from "./404-page.module.sass"

// Sub Components

const Vimeo: FunctionComponent = () => (
	<a href="https://vimeo.com/apricum">
		<u>Vimeo</u>
	</a>
)

const Error404Page: Page = () => {
	const coverImage = "/storage/uploads/2021/05/24/60abebf04b24cerror-cover.jpg"
	const coverImageUrl = imageUrlFromComponent(coverImage, ImageFormat.ExtraLarge)

	return (
		<section className={styles.page}>
			<ImageCover src={coverImageUrl} />
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
