import { FunctionComponent } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { scaledViewportImageSources } from "~/components/asset-image/functions/asset-image-sources"
import { PropsWithClassName } from "~/types/props"
import { URLComponent } from "~/utils/routing/library/url"

// Values

const mobileBreakpoint = 1024

// Component

interface Props extends PropsWithClassName {
	src: { desktop?: URLComponent; mobile?: URLComponent }
	format?: ImageFormat
	alt?: string
}

const ViewportAssetImage: FunctionComponent<Props> = props => {
	const sourceComponents = {
		desktop: props.src.desktop ?? fallbackImageComponent,
		mobile: props.src.mobile ?? fallbackImageComponent
	}

	const format = props.format ?? ImageFormat.Regular
	const scaledSources = scaledViewportImageSources(sourceComponents, format)
	const [desktopBase, desktopDouble] = scaledSources.desktop
	const [mobileBase, mobileDouble] = scaledSources.mobile

	return (
		<picture>
			<source srcSet={`${mobileBase} 1x, ${mobileDouble} 2x`} media={`(min-width: 0px) and (max-width: ${mobileBreakpoint}px)`} />
			<source srcSet={`${desktopBase} 1x, ${desktopDouble} 2x`} media={`(min-width: ${mobileBreakpoint + 1}px)`} />
			<img className={props.className} />
		</picture>
	)
}

export default ViewportAssetImage
