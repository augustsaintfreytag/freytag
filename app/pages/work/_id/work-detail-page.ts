import { Component, Vue } from "vue-property-decorator"
import { DateFormatter } from "~/components/common/storage/providers/date-formatter"
import { Content } from "~/components/common/storage/models/content-block"
import { Head } from "~/components/common/head/head"
import { MetaTag } from "~/components/common/head/library/meta-tag"
import { Dictionary } from "~/components/common/library/dictionary"
import { UUID } from "~/components/common/library/uuid"
import { Work } from "~/components/common/storage/models/work-item"

import Markdown from "~/components/markdown/markdown.vue"
import LifeEventDetailTableComponent from "~/components/life-event/life-event-detail-table.vue"
import HeadingBlockComponent from "~/components/content-blocks/heading-content-block/heading-content-block.vue"
import ImageColumnsBlockComponent from "~/components/content-blocks/image-columns-block/image-columns-block.vue"
import TextQuoteBlockComponent from "~/components/content-blocks/text-quote-block/text-quote-block.vue"
import TextColumnBlockComponent from "~/components/content-blocks/text-column-block/text-column-block.vue"
import VideoVimeoBlockComponent from "~/components/content-blocks/video-vimeo-block/video-vimeo-block.vue"
import { PageData } from "~/components/common/pages/library/page-data"
import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"

// Library

interface AsyncPartialData extends PageData {
	workItemId: string|undefined
	workItem: Work.Item|undefined
}

interface Data extends AsyncPartialData {
	formTypes: Dictionary<Content.Form>,
}

// Data Form

async function fetchWorkItem(id: UUID): Promise<Work.Item|undefined> {
	try {
		let workItem: Work.Item|undefined

		// Fetch by Slug
		workItem = await CockpitDataProvider.workItemBySlug(id)

		// Fetch by Id
		if (!workItem) {
			workItem = await CockpitDataProvider.workItemById(id)
		}

		return workItem
	} catch (error) {
		console.error(`Could not fetch active work item.`, error)
	}
}

// Component

@Component({

	components: {
		Markdown,
		LifeEventDetailTableComponent,
		HeadingBlockComponent,
		TextQuoteBlockComponent,
		ImageColumnsBlockComponent,
		TextColumnBlockComponent,
		VideoVimeoBlockComponent
	},

	async asyncData({ params }): Promise<AsyncPartialData> {
		const workItemId = params["id"] as UUID|undefined

		const workItem: Work.Item|undefined = await (async () => {
			if (!workItemId) {
				return undefined
			}

			return await fetchWorkItem(workItemId)
		})()
		

		if (!workItem) {
			if (workItemId) {
				throw { statusCode: 404, message: `Work item with id '${workItemId}' not found.`}
			} else {
				throw { statusCode: 404, message: `Missing work id, can not fetch work item.` }
			}
		}

		return { workItem, workItemId }
	},

	head() {
		const data = this.$data as Data
		const titleComponents = ["Work"]
		const meta: MetaTag[] = []

		const item = data.workItem
		const itemName = item && item.name ? item.name : undefined

		if (item) {
			const event = item.event
			const metaTag: MetaTag = {hid: "description", name: "description", content: undefined}

			if (event) {
				const introducingText = `${event.kind}, ${event.format}, ${DateFormatter.formattedDateRange(event)}`
				metaTag.content = `${introducingText} ${item.description}`
			} else {
				metaTag.content = item.description
			}

			meta.push(metaTag)
		}

		return Head.modeled({
			title: Head.Form.suffixedTitle(itemName || "Untitled", titleComponents), meta
		})
	}

})
export default class WorkDetailPage extends Vue {

	formTypes = {
		heading: Content.Form.Heading,
		imageColumns: Content.Form.ImageColumns,
		textColumn: Content.Form.TextColumn,
		textQuote: Content.Form.TextQuote,
		videoVimeo: Content.Form.VideoVimeo
	}

	workItemId: UUID|undefined
	workItem: Work.Item|undefined

}