import useDevicePixelRatio, { defaultFallbackDevicePixelRatio, DotsPerPixel } from "~/components/device-pixel-ratio/device-pixel-ratio-hook"
import { TimeInterval } from "~/utils/date/library/intervals"
import { useAfterInitialRender } from "~/utils/render/initial-render-hook"

const afterRenderUpdateDelay: TimeInterval = 1000

export default function useRenderDevicePixelRatio(): DotsPerPixel {
	const [ratio, updateRatio] = useDevicePixelRatio(defaultFallbackDevicePixelRatio)

	useAfterInitialRender(() => {
		setTimeout(updateRatio, afterRenderUpdateDelay)
	})

	return ratio
}
