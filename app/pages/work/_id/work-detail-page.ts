import { Component, Vue } from "vue-property-decorator"
import { DateFormatter } from "~/components/common/storage/providers/date-formatter"
import { WorkDetailPageData } from "./work-detail-page-data"
import { WorkDetailPageMapper } from "./work-detail-page-mapper"
import { Content } from "~/components/common/storage/models/content-block"
import { Head } from "~/components/common/head/head"
import { MetaTag } from "~/components/common/head/library/meta-tag"

import Markdown from "~/components/markdown/markdown.vue"
import LifeEventDetailTableComponent from "~/components/life-event/life-event-detail-table.vue"
import HeadingBlockComponent from "~/components/content-blocks/heading-content-block/heading-content-block.vue"
import ImageColumnsBlockComponent from "~/components/content-blocks/image-columns-block/image-columns-block.vue"
import TextQuoteBlockComponent from "~/components/content-blocks/text-quote-block/text-quote-block.vue"
import TextColumnBlockComponent from "~/components/content-blocks/text-column-block/text-column-block.vue"
import VideoVimeoBlockComponent from "~/components/content-blocks/video-vimeo-block/video-vimeo-block.vue"

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

	async asyncData({ params }) {
		const initialData: WorkDetailPageData = {
			types: {
				Form: {
					Heading: Content.Form.Heading,
					ImageColumns: Content.Form.ImageColumns,
					TextColumn: Content.Form.TextColumn,
					TextQuote: Content.Form.TextQuote,
					VideoVimeo: Content.Form.VideoVimeo
				}
			},
		
			workItemId: undefined,
			workItem: undefined
		}

		initialData.workItemId = params["id"]
		await WorkDetailPageMapper.updateWorkItem(initialData)

		if (!initialData.workItem) {
			if (initialData.workItemId) {
				throw { statusCode: 404, message: `Work with id '${initialData.workItemId}' could not be fetched.`}
			} else {
				throw { statusCode: 404, message: `Missing work id.` }
			}
		}

		return initialData
	},

	head() {
		const data = this.$data as WorkDetailPageData
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
export default class WorkDetailPage extends Vue {}