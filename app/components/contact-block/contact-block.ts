import { Component, Vue } from "vue-property-decorator"
import Rot13 from "../common/address-obfuscator/provider/rot-13"

// Modules

const rot13 = new Rot13()

// Library

interface Data {
	phoneNumber: string
	mailAddress: string
}

// Component

@Component({
	data(): Data {
		return {
			phoneNumber: rot13.encoded("030 915 779 70"),
			mailAddress: rot13.encoded("me@augustfreytag.com")
		}
	},

	created() {
		if (process.browser) {
			const data = this.$data as Data
			data.phoneNumber = rot13.decoded(data.phoneNumber)
			data.mailAddress = rot13.decoded(data.mailAddress)
		}
	}
})
export default class ContactBlockComponent extends Vue implements Data {

	phoneNumber!: string
	mailAddress!: string

}