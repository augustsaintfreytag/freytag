import { Url, UrlComponent } from "~/components/common/library/url"
import { Configuration } from "~/components/common/configuration/configuration"
import { QueryParameterProvider } from "~/components/common/cockpit/providers/query-parameter-provider"
import { CockpitImageRequestPreset } from "~/components/common/cockpit/library/cockpit-image-request-presets"

export namespace CockpitAssetPathProvider {

	const token = Configuration.Connections.cms.token()
	const run = Math.floor(Math.random() * 1e10).toString(16)

	const pathPrefix = (() => {
		const connection = Configuration.Connections.cms
		return `${connection.protocol(Configuration.Context.Client)}://${connection.host(Configuration.Context.Client)}`
	})()

	export function cockpitAsset(component: UrlComponent): Url {
		return `${pathPrefix}${component}`
	}

	export function cockpitImage(component: UrlComponent, format?: CockpitImageRequestPreset.Format|undefined): Url {
		const sourcePath = component

		const imageRequest = CockpitImageRequestPreset.preset(format || CockpitImageRequestPreset.Format.Regular)
		const imageRequestOptions = imageRequest.options(sourcePath) as QueryParameterProvider.ParameterDictionary

		const joinedImageRequestOptions = QueryParameterProvider.joinedParameters(imageRequestOptions)
		const imageUrl: Url = `${pathPrefix}/api/cockpit/image?token=${token}&${joinedImageRequestOptions}&run=${run}`

		return imageUrl
	}

}