import { Component, Vue } from "vue-property-decorator"
import { Url } from "../../common/library/url"

interface RouteEntry {
	address: Url
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