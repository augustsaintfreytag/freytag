import * as CockpitImageRequestPresets from "@/utils/cockpit/library/cockpit-image-request-presets"
import { Format as CockpitImageFormat } from "@/utils/cockpit/library/cockpit-image-request-presets"
import { URL, URLComponent } from "@/utils/common/library/url"
import { CockpitAssetPathForm } from "cockpit-access"
import Vue from "vue"

type RawCockpitImageFormat = CockpitImageFormat|string

declare module 'vue/types/vue' {
  interface Vue {
    $imagePath(component: URLComponent|undefined, format?: RawCockpitImageFormat|undefined): URL
  }
}

Vue.prototype.$imagePath = (component: URLComponent|undefined, format?: RawCockpitImageFormat|undefined) => {
  if (!component) {
    return undefined
  }

  const imageFormat = (format ?? CockpitImageFormat.Regular) as CockpitImageFormat
  const imageRequest = CockpitImageRequestPresets.preset(imageFormat)
  return CockpitAssetPathForm.cockpitImage(component, imageRequest)
}