import { Context } from "@nuxt/vue-app-edge"
import { UrlComponent, Url } from "~/components/common/library/url"
import { CockpitAssetPathProvider } from "~/components/common/cockpit/providers/cockpit-asset-path-provider"
import { CockpitImageRequestPreset } from "~/components/common/cockpit/library/cockpit-image-request-presets"

type Format = CockpitImageRequestPreset.Format

export type PathFormBlockWithComponent = (component: UrlComponent) => Url
export type PathFormBlockWithComponentAndFormat = (component: UrlComponent, format?: Format|undefined) => Url

export default (_context: Context, inject: CallableFunction) => {
	
	inject("assetPath", (component: UrlComponent) => {
		return CockpitAssetPathProvider.cockpitAsset(component)
	})

	inject("imagePath", (component: UrlComponent, format?: Format|undefined) => {
		return CockpitAssetPathProvider.cockpitImage(component, format)
	})

}