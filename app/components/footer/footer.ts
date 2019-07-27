import { Component, Vue } from "vue-property-decorator"
import Rot13 from "../common/address-obfuscator/provider/rot-13"
import { FooterData } from "./footer-data"
import { PageLink } from "./page-link"

const rot13 = new Rot13()

@Component({

	data() {
		const initialData: FooterData = {
			mail: rot13.encoded("me@augustfreytag.com")
		}

		return initialData
	},

	computed: {
		mapLinks(): PageLink[] {
			return [
				{address: "/", name: "Home"},
				{address: "/life", name: "Life"},
				{address: "/work", name: "Work"},
				{address: "/privacy", name: "Privacy"},
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
	},

	created() {
		if (process.browser) {
			const data = this.$data as FooterData
			data.mail = rot13.decoded(data.mail)
		}
	}

})
export default class FooterComponent extends Vue {}