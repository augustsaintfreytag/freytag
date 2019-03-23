import { Context } from "@nuxt/vue-app-edge"
import { UrlComponent } from "~/components/common/library/url"
import { CockpitAssetPathProvider } from "~/components/common/cockpit/providers/cockpit-asset-path-provider"
import { CockpitImageRequestPreset } from "~/components/common/cockpit/library/cockpit-image-request-presets"

export default (_context: Context, inject: CallableFunction) => {
	
	inject("assetPath", (component: UrlComponent) => {
		return CockpitAssetPathProvider.cockpitAsset(component)
	})

	inject("imagePath", (component: UrlComponent, format?: CockpitImageRequestPreset.Format|undefined) => {
		return CockpitAssetPathProvider.cockpitImage(component, format)
	})

}