import { Vue, Component } from "vue-property-decorator"

@Component({

	props: ["videoCode", "videoAspectValue"]

})
export default class VimeoPlayerComponent extends Vue {}