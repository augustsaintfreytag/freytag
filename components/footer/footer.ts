import { Component, Vue } from "vue-property-decorator"
import { UrlComponent } from "../common/library/url"

interface MapRoute {
	address: UrlComponent,
	name: string
}

interface PlatformLink {
	address: UrlComponent,
	name: string,
	spriteId: string
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
		},

		platformLinks(): PlatformLink[] {
			return [
				{address: "vimeo.com/apricum", name: "Vimeo", spriteId: "logo-vimeo"},
				{address: "gitlab.com/apricum", name: "GitLab", spriteId: "logo-gitlab"},
				{address: "twitter.com/augustsfreytag", name: "Twitter", spriteId: "logo-twitter"},
				{address: "medium.com/@augustfreytag", name: "Medium", spriteId: "logo-medium"}
			]
		}
	}

})
export default class FooterComponent extends Vue {

}