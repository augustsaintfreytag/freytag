declare module "*.vue" {
	import Vue from "vue"
	export default Vue
}

declare module 'vue/types/vue' {
	import { PathFormBlockWithComponent, PathFormBlockWithComponentAndFormat } from "plugins/paths"

	interface Vue {
	  $assetPath: PathFormBlockWithComponent,
	  $imagePath: PathFormBlockWithComponentAndFormat 
	}
  }