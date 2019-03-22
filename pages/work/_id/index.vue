<template>
	<section class="work-pages work-detail-page">
		<section class="cover">
			<div class="image-holder">
				<img class="covering" v-if="workItem.titleImage" :src="$imagePath(workItem.titleImage.path, 'cover')" />
			</div>
			<div class="title-holder">
				<h2>{{ workItem.name }}</h2>
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
		<span v-for="contentBlock in workItem.blocks" :key="contentBlock.meta.id">
			<image-columns-block-component v-if="contentBlock.form === types.Form.ImageColumns" :contentBlock="contentBlock" />
			<text-quote-block-component v-if="contentBlock.form === types.Form.TextQuote" :contentBlock="contentBlock" />
			<text-column-block-component v-if="contentBlock.form === types.Form.TextColumn" :contentBlock="contentBlock" />
			<video-vimeo-block-component v-if="contentBlock.form === types.Form.VideoVimeo" :contentBlock="contentBlock" />
		</span>
	</section>
</template>

<style lang="scss" src="./work-detail-page.scss"></style>

<script lang="ts" src="./work-detail-page.ts"></script>