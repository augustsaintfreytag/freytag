import HeadingContentBlock from "@/components/content-blocks/heading-content-block/heading-content-block.vue"
import ImageColumnsContentBlock from "@/components/content-blocks/image-columns-block/image-columns-block.vue"
import TextColumnContentBlock from "@/components/content-blocks/text-column-block/text-column-block.vue"
import TextQuoteContentBlock from "@/components/content-blocks/text-quote-block/text-quote-block.vue"
import VideoVimeoContentBlock from "@/components/content-blocks/video-vimeo-block/video-vimeo-block.vue"
import { formattedDateRange } from "@/components/life-event/functions/life-event-date-formatter"
import LifeEventDetailTable from "@/components/life-event/life-event-detail-table.vue"
import Markdown from "@/components/markdown/markdown.vue"
import { Dictionary } from "@/utils/common/library/dictionary"
import { UUID } from "@/utils/common/library/uuid"
import { head, suffixedTitleForHead } from "@/utils/head/head"
import { MetaTag } from "@/utils/head/library/meta-tag"
import { ContentBlockKind } from "@/utils/storage/models/content-block-kind"
import { WorkItem } from "@/utils/storage/models/work-item"
import { Component, Vue } from "vue-property-decorator"
import * as DataProvider from "./work-detail-data-provider"

// Library

interface AsyncPartialData {
	workItemId: string|undefined
	workItem: WorkItem|undefined
}

interface Data extends AsyncPartialData {
	formTypes: Dictionary<ContentBlockKind>,
}

// Component

@Component({
	components: {
		Markdown,
		LifeEventDetailTable,
		HeadingContentBlock,
		TextQuoteContentBlock,
		ImageColumnsContentBlock,
		TextColumnContentBlock,
		VideoVimeoContentBlock
	},

	async asyncData({ params }): Promise<AsyncPartialData> {
		const workItemId = params["id"] as UUID|undefined

		const workItem: WorkItem|undefined = await (async () => {
			if (!workItemId) {
				return undefined
			}

			return await DataProvider.fetchWorkItem(workItemId)
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
				const introducingText = `${event.kind}, ${event.format}, ${formattedDateRange(event)}`
				metaTag.content = `${introducingText} ${item.description}`
			} else {
				metaTag.content = item.description
			}

			meta.push(metaTag)
		}

		return head({
			title: suffixedTitleForHead(itemName || "Untitled", titleComponents), meta
		})
	}
})
export default class WorkDetailPage extends Vue implements Data {

	formTypes = {
		heading: ContentBlockKind.Heading,
		imageColumns: ContentBlockKind.ImageColumns,
		textColumn: ContentBlockKind.TextColumn,
		textQuote: ContentBlockKind.TextQuote,
		videoVimeo: ContentBlockKind.VideoVimeo
	}

	workItemId: UUID|undefined
	workItem: WorkItem|undefined

}