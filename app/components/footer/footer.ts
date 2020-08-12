import Rot13 from "@/utils/address-obfuscator/functions/rot-13"
import { Component, Vue } from "vue-property-decorator"
import { PageLink } from "./models/page-link"

// Modules

const rot13 = new Rot13()

// Library

interface Data {
	mail: string
}

// Component

@Component({

	data(): Data {
		return {
			mail: rot13.encoded("me@augustfreytag.com")
		}
	},

	created() {
		if (process.browser) {
			const data = this.$data as Data
			data.mail = rot13.decoded(data.mail)
		}
	}

})
export default class FooterComponent extends Vue implements Data {

	// Data

	mail!: string

	// Preset Content

	get mapLinks(): PageLink[] {
		return [
			{address: "/", name: "Home"},
			{address: "/life", name: "Life"},
			{address: "/work", name: "Work"},
			{address: "/privacy", name: "Privacy"},
			{address: "/imprint", name: "Imprint"}
		]
	}

	get platformLinks(): PageLink[] {
		return [
			{address: "vimeo.com/apricum", name: "Vimeo", spriteId: "logo-vimeo"},
			{address: "gitlab.com/apricum", name: "GitLab", spriteId: "logo-gitlab"},
			{address: "twitter.com/augustfreytag", name: "Twitter", spriteId: "logo-twitter"},
			{address: "medium.com/@augustfreytag", name: "Medium", spriteId: "logo-medium"}
		]
	}

	get furtherLinks(): PageLink[] {
		return [
			{address: "apricummedia.com", name: "Apricum Media and Labs"},
			{address: "steveluxembourg.com", name: "Steve Luxembourg"},
			{address: "records.lu", name: "Luxembourg Records"}
		]
	}

}