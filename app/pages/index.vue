<template>
	<section class="index-page">
		<section class="introducer">
			<div class="title-holder">
				<header-branding-component />
			</div>
			<div class="caption" v-if="graphic.caption">{{ graphic.caption }}</div>
			<div class="image-holder">
				<img class="covering" :src="$imagePath(graphic.asset.path, 'large')" />
			</div>
		</section>
		<section class="showcases inset" v-if="works && works.items.length">
			<div class="leader">Selected Showcase</div>
			<section class="work-showcase kind-blip-colored kind-all" v-for="workItem in works.items" :key="workItem.meta.id">
				<nuxt-link :to="`/work/${ workItem.meta.id }`">
					<div class="image-holder">
						<img class="covering" v-if="workItem.titleImage" :src="$imagePath(workItem.titleImage.path, 'regular')" />
					</div>
					<div class="item-data">
						<div class="title">{{ workItem.name }}</div>
						<div class="blip"></div>
						<div class="format">{{ workItem.event && workItem.event.format ? workItem.event.format : "Publication" }}</div>
						<div class="contents">{{ !workItem.numberOfSamples ? "No samples" : workItem.numberOfSamples === 1 ? "1 sample" : `${workItem.numberOfSamples} samples` }}</div>
					</div>
				</nuxt-link>
			</section>
		</section>
		<aside class="opt">
			<p>Portfolio site of August Freytag (August S. Freytag), presenting a life overview and work showcases, publications, further platforms and projects and contact options.</p>
			<p>All displayed contents are intellectual property of August Freytag (August S. Freytag), all rights reserved. Denoted contents belong to their respective owners.</p>
		</aside>
	</section>
</template>

<style lang="scss" src="./index-page.scss"></style>

<script lang="ts" src="./index-page.ts"></script>