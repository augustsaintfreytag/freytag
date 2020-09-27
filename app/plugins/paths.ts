import * as CockpitImageRequestPresets from "@/utils/cockpit/library/cockpit-image-request-presets"
import { Format as CockpitImageFormat } from "@/utils/cockpit/library/cockpit-image-request-presets"
import { URL, URLComponent } from "@/utils/common/library/url"
import { CockpitAssetPathForm } from "cockpit-access"
import Vue from "vue"

declare module 'vue/types/vue' {
  interface Vue {
    $imagePath(component: URLComponent, format?: CockpitImageFormat|undefined): URL
  }
}

Vue.prototype.$imagePath = (component: URLComponent, format?: CockpitImageFormat|undefined) => {
  const imageRequest = CockpitImageRequestPresets.preset(format ?? CockpitImageFormat.Regular)
  return CockpitAssetPathForm.cockpitImage(component, imageRequest)
}