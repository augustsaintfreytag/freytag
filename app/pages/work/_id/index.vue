<template>
	<article class="work-pages work-detail-page">
		<section class="cover">
			<div class="image-holder">
				<img class="covering" v-if="workItem.titleImage" :src="$imagePath(workItem.titleImage.path, 'large')" />
			</div>
			<div class="title-holder">
				<h1>{{ workItem.name }}</h1>
			</div>
			<div class="scroll-indicator">
				<svg class="icon">
					<use xlink:href="#scroll-indicator"></use>
				</svg>
			</div>
		</section>
		<section class="introduction inset">
			<section class="details">
				<table>
					<tbody>
						<tr v-for="row in detailsRows" :key="row.name">
							<td class="label">{{ row.name }}</td>
							<td class="text">{{ row.value }}</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section class="description">
				{{ workItem.description }}
			</section>
		</section>
		<div class="divider inset"></div>
		<template v-for="contentBlock in workItem.blocks">
			<image-columns-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.ImageColumns" :contentBlock="contentBlock" />
			<text-quote-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.TextQuote" :contentBlock="contentBlock" />
			<text-column-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.TextColumn" :contentBlock="contentBlock" />
			<video-vimeo-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.VideoVimeo" :contentBlock="contentBlock" />
		</template>
	</article>
</template>

<style lang="scss" src="./work-detail-page.scss"></style>

<script lang="ts" src="./work-detail-page.ts"></script>