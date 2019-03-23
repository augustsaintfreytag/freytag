import { Component, Vue } from "vue-property-decorator"
import SpriteSet from "~/components/sprite-set/sprite-set.vue"

@Component({
	components: {
		SpriteSet
	}
})
export default class MaintenanceLayout extends Vue {}