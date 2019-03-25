import { Component, Vue } from "vue-property-decorator"
import { PageLink } from "./page-link"

interface PageLink {
	address: UrlComponent,
	name: string,
	spriteId?: string
}

@Component({

	computed: {
		mapLinks(): PageLink[] {
			return [
				{address: "/", name: "Home"},
				{address: "/life", name: "Life"},
				{address: "/work", name: "Work"},
				{address: "/imprint", name: "Imprint"}
			]
		},

		platformLinks(): PageLink[] {
			return [
				{address: "vimeo.com/apricum", name: "Vimeo", spriteId: "logo-vimeo"},
				{address: "gitlab.com/apricum", name: "GitLab", spriteId: "logo-gitlab"},
				{address: "twitter.com/augustsfreytag", name: "Twitter", spriteId: "logo-twitter"},
				{address: "medium.com/@augustfreytag", name: "Medium", spriteId: "logo-medium"}
			]
		},

		furtherLinks(): PageLink[] {
			return [
				{address: "apricummedia.com", name: "Apricum Media and Labs"},
				{address: "steveluxembourg.com", name: "Steve Luxembourg"},
				{address: "records.lu", name: "Luxembourg Records"}
			]
		}
	}

})
export default class FooterComponent extends Vue {}