<template>
	<article class="work-pages work-detail-page">
		<section class="cover">
			<div class="image-holder">
				<img class="covering" v-if="workItem.titleImage" :src="$imagePath(workItem.titleImage.path, 'large')" />
			</div>
			<div class="title-holder">
				<h1>{{ workItem.name }}</h1>
			</div>
		</section>
		<section class="introduction inset" :class="{ 'collapsed': workItem.event === undefined }">
			<section class="details">
				<life-event-detail-table :lifeEvent="workItem.event" rowNames="['Title', 'Span', 'Kind', 'Format', 'Role', 'Location', 'Context']" />
			</section>
			<section class="description text">
				<markdown :content="workItem.description"></markdown>
			</section>
		</section>
		<div class="divider inset" v-if="workItem.blocks.length"></div>
		<template v-for="contentBlock in workItem.blocks">
			<heading-content-block :key="contentBlock.meta.id" v-if="contentBlock.form === formTypes.heading" :content-block="contentBlock" />
			<image-columns-content-block :key="contentBlock.meta.id" v-if="contentBlock.form === formTypes.imageColumns" :content-block="contentBlock" />
			<text-quote-content-block :key="contentBlock.meta.id" v-if="contentBlock.form === formTypes.textQuote" :content-block="contentBlock" />
			<text-column-content-block :key="contentBlock.meta.id" v-if="contentBlock.form === formTypes.textColumn" :content-block="contentBlock" />
			<video-vimeo-content-block :key="contentBlock.meta.id" v-if="contentBlock.form === formTypes.videoVimeo" :content-block="contentBlock" />
		</template>
		<aside class="opt">
			<p>Showcase "{{ workItem.name }}" written and presented by August Saint Freytag (Freytag, August Freytag, August S. Freytag, A.S.F.). All contents in imagery, video and text are intellectual property of their respective owners, all rights reserved if not stated otherwise.</p>
		</aside>
	</article>
</template>

<style lang="scss" src="./work-detail-page.scss"></style>

<script lang="ts" src="./work-detail-page.ts"></script>