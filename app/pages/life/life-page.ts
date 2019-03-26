import { Component, Vue } from "vue-property-decorator"

import { LifePageData } from "./life-page-data"
import { LifePageMapper } from "./life-page-mapper"
import LifeEventComponent from "~/components/life-event/life-event.vue"
import { Head } from "~/components/common/head/head"

@Component({
	components: {
		LifeEventComponent,
	},

	async asyncData() {
		const initialData: LifePageData = {
			lifeFilter: undefined,
			lifeSortingMode: "time",
			lifeSortingIsReversed: true,
			unsortedLifeEvents: [],
			lifeEvents: [],
			lifeEventIndexMap: {}
		}

		await LifePageMapper.updateLifeEvents(initialData)
		LifePageMapper.mapSortedLifeEvents(initialData)

		return initialData
	},

	computed: {
		eventToggleDefinitions() {
			return [
				{identifier: "all", name: "All"},
				{identifier: "life", name: "Life", filter: "Life"},
				{identifier: "education", name: "Education", filter: "Education"},
				{identifier: "film", name: "Film", filter: "Film"},
				{identifier: "development", name: "Development", filter: "Development"},
				{identifier: "artwork", name: "Artwork", filter: "Artwork"},
				{identifier: "photography", name: "Photography", filter: "Photography"}
			]
		},

		eventHeaderDefinitions() {
			return [
				{identifier: "time", name: "Span", sortable: true},
				{identifier: "format", name: "Format", sortable: true},
				{identifier: "role", name: "Role", sortable: false},
				{identifier: "location", name: "Location", sortable: false},
				{identifier: "context", name: "Context", sortable: false}
			]
		}
	},

	head() {
		return Head.modeled({
			title: Head.Form.suffixedTitle("Life"),
			meta: [
				{hid: "description", name: "description", content: "Listing of all recorded projects, work-in-progress and completed, for categories life, education, film, development, artwork, and photography, presented by time, format, role, location, and context surrounding each entry."}
			]
		})
	}
})
export default class LifePage extends Vue {

	// Events

	didToggleFilter(_event: MouseEvent, filter: string) {
		const data = this.$data as LifePageData

		LifePageMapper.toggleFilter(data, filter)
		LifePageMapper.mapSortedLifeEvents(data)
	}

	didToggleSorting(_event: MouseEvent, sortingMode: string) {
		const data = this.$data as LifePageData

		if (!sortingMode) {
			return
		}

		LifePageMapper.toggleSortingMode(data, sortingMode)
		LifePageMapper.mapSortedLifeEvents(data)
	}

}