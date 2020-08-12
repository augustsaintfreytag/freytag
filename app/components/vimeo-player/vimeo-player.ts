import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class VimeoPlayerComponent extends Vue {

	@Prop() videoCode!: string
	@Prop() videoAspectValue!: string

}