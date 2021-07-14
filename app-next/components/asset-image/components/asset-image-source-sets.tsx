import { FunctionComponent } from "react"
import { desktopMediaQuery, phoneMediaQuery, tabletMediaQuery } from "~/components/asset-image/library/media-query-values"
import { ViewportURLCouples } from "~/components/asset-image/library/viewport-sources"

export const SingleSourceSet: FunctionComponent<{ sources: ViewportURLCouples; sourceIndex: number }> = props => {
	const { sources, sourceIndex } = props

	return (
		<>
			<source srcSet={`${sources.phone[sourceIndex]}`} media={phoneMediaQuery} />
			<source srcSet={`${sources.tablet[sourceIndex]}`} media={tabletMediaQuery} />
			<source srcSet={`${sources.desktop[sourceIndex]}`} media={desktopMediaQuery} />
		</>
	)
}

export const ScaledSourceSet: FunctionComponent<{ sources: ViewportURLCouples }> = props => {
	const { sources } = props

	return (
		<>
			<source srcSet={`${sources.phone[0]} 1x, ${sources.phone[1]} 2x`} media={phoneMediaQuery} />
			<source srcSet={`${sources.tablet[0]} 1x, ${sources.tablet[1]} 2x`} media={tabletMediaQuery} />
			<source srcSet={`${sources.desktop[0]} 1x, ${sources.desktop[1]} 2x`} media={desktopMediaQuery} />
		</>
	)
}
