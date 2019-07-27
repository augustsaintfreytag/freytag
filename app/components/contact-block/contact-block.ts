import { Component, Vue } from "vue-property-decorator"
import Rot13 from "../common/address-obfuscator/provider/rot-13"

const rot13 = new Rot13()

interface ContactBlockData {
	phoneNumber: string
	mailAddress: string
}

@Component({
	data() {
		const initialData: ContactBlockData = {
			phoneNumber: rot13.encoded("030 915 779 70"),
			mailAddress: rot13.encoded("me@augustfreytag.com")
		}

		return initialData
	},

	created() {
		if (process.browser) {
			const data = this.$data as ContactBlockData
			data.phoneNumber = rot13.decoded(data.phoneNumber)
			data.mailAddress = rot13.decoded(data.mailAddress)
		}
	}
})
export default class ContactBlockComponent extends Vue {}