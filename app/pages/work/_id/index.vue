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
		<section class="introduction inset" :class="{ 'collapsed': workItem.event === undefined }">
			<section class="details">
				<life-event-detail-table-component :lifeEvent="workItem.event" rowNames="['Title', 'Span', 'Kind', 'Format', 'Role', 'Location', 'Context']" />
			</section>
			<section class="description text">
				<markdown :content="workItem.description"></markdown>
			</section>
		</section>
		<div class="divider inset" v-if="workItem.blocks.length"></div>
		<template v-for="contentBlock in workItem.blocks">
			<heading-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.Heading" :content-block="contentBlock" />
			<image-columns-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.ImageColumns" :content-block="contentBlock" />
			<text-quote-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.TextQuote" :content-block="contentBlock" />
			<text-column-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.TextColumn" :content-block="contentBlock" />
			<video-vimeo-block-component :key="contentBlock.meta.id" v-if="contentBlock.form === types.Form.VideoVimeo" :content-block="contentBlock" />
		</template>
		<aside class="opt">
			<p>Showcase "{{ workItem.name }}" written and presented by August Freytag. All contents in imagery, video and text are intellectual property of August Freytag (August S. Freytag).</p>
		</aside>
	</article>
</template>

<style lang="scss" src="./work-detail-page.scss"></style>

<script lang="ts" src="./work-detail-page.ts"></script>