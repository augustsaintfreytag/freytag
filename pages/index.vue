<template>
	<section class="index-page">
		<section class="introducer" :style="`background-image: url(${ $root.managedResourcePath(graphic.asset.path) })`">
			<header-branding-component />
		</section>
		<section class="showcases inset" v-if="works && works.items.length">
			<div class="leader">Selected Showcase</div>
			<section class="work-showcase kind-blip-colored kind-all" v-for="workItem in works.items" :key="workItem.meta.id">
				<nuxt-link :to="`/work/${ workItem.meta.id }`">
					<div class="image-holder">
						<img class="covering" v-if="workItem.titleImage" :src="$root.managedResourcePath(workItem.titleImage.path)" />
					</div>
					<div class="item-data">
						<div class="title">{{ workItem.name }}</div>
						<div class="blip"></div>
						<div class="format">{{ workItem.event && workItem.event.format ? workItem.event.format : "Publication" }}</div>
						<div class="contents">{{ workItem.numberOfSamples === 1 ? "1 sample" : `${workItem.numberOfSamples} samples` }}</div>
					</div>
				</nuxt-link>
			</section>
		</section>
		<section class="spacer" style="height: 500px;">

		</section>
	</section>
</template>

<style lang="scss" src="./index-page.scss"></style>

<script lang="ts" src="./index-page.ts"></script>
