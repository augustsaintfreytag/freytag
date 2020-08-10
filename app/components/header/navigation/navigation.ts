import { URL } from "@/utils/common/library/url"
import { Component, Vue } from "vue-property-decorator"

interface RouteEntry {
	address: URL
	name: string
}

@Component
export default class HeaderComponent extends Vue {

	get routes(): RouteEntry[] {
		return [
			{address: '/', name: 'Home'},
			{address: '/life', name: 'Life'},
			{address: '/work', name: 'Work'},
			{address: '/imprint', name: 'Imprint'},
		]
	}

}