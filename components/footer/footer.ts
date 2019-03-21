import { Component, Vue } from "vue-property-decorator"
import { UrlComponent } from "../common/library/url"

interface MapRoute {
	address: UrlComponent,
	name: string
}

@Component({

	computed: {
		mapRoutes(): MapRoute[] {
			return [
				{address: "/", name: "Home"},
				{address: "/life", name: "Life"},
				{address: "/work", name: "Work"},
				{address: "/impress", name: "Impress"},
				{address: "/disclaimer", name: "Disclaimer"}
			]
		}
	}

})
export default class FooterComponent extends Vue {

}