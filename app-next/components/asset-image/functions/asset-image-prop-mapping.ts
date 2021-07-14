import { AssetImageFormat } from "~/components/asset-image/library/asset-image-format"
import { ViewportAssetImageFormats } from "~/components/asset-image/library/viewport-sources"

// Modeling

interface ViewportAssetImageProps {
	format?: AssetImageFormat
	formats?: ViewportAssetImageFormats
}

export function applicableAssetImageFormatsFromProps(props: ViewportAssetImageProps, defaultFormat: AssetImageFormat): ViewportAssetImageFormats {
	if (props.formats) {
		return props.formats
	}

	if (props.format) {
		return uniformViewportAssetImageFormats(props.format)
	}

	return uniformViewportAssetImageFormats(defaultFormat)
}

export function uniformViewportAssetImageFormats(format: AssetImageFormat): ViewportAssetImageFormats {
	return {
		desktop: format,
		tablet: format,
		phone: format
	}
}
