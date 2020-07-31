import Vue from "vue"
import { UrlComponent, Url } from "~/components/common/library/url"
import { CockpitAssetPathProvider } from "~/components/common/cockpit/providers/cockpit-asset-path-provider"
import { CockpitImageRequestPreset } from "~/components/common/cockpit/library/cockpit-image-request-presets"

type Format = CockpitImageRequestPreset.Format

declare module 'vue/types/vue' {
  interface Vue {
    $imagePath(component: UrlComponent, format?: Format|undefined): Url
  }
}

Vue.prototype.$imagePath = (component: UrlComponent, format?: Format|undefined) => {
	return CockpitAssetPathProvider.cockpitImage(component, format)
}