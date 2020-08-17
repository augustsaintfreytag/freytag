import * as Rot13 from "@/utils/address-obfuscator/functions/rot-13"
import { Component, Vue } from "vue-property-decorator"

// Library

interface Data {
	phoneNumber: string
	mailAddress: string
}

// Component

@Component({
	data(): Data {
		return {
			phoneNumber: Rot13.encoded("030 915 779 70"),
			mailAddress: Rot13.encoded("me@augustfreytag.com")
		}
	},

	created() {
		if (process.browser) {
			const data = this.$data as Data
			data.phoneNumber = Rot13.decoded(data.phoneNumber)
			data.mailAddress = Rot13.decoded(data.mailAddress)
		}
	}
})
export default class ContactBlock extends Vue implements Data {

	phoneNumber!: string
	mailAddress!: string

}