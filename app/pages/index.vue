<template>
	<section class="index-page">
		<section class="introducer">
			<div class="title-holder">
				<header-branding-component />
			</div>
			<div class="caption" v-if="graphic && graphic.caption">{{ graphic.caption }}</div>
			<div class="image-holder" v-if="graphic">
				<img class="covering" :src="$imagePath(graphic.asset.path, 'large')" />
			</div>
		</section>
		<section class="showcases inset" v-if="works && works.items.length">
			<div class="leader">Selected Showcase</div>
			<section 
				class="work-showcase kind-blip-colored kind-all" 
				:class="workItem.event && workItem.event.kind ? `kind-${workItem.event.kind.toLowerCase()}` : ''"
				v-for="workItem in works.items" 
				:key="workItem.meta.id"
			>
				<nuxt-link :to="`/work/${ workItem.meta.id }`">
					<div class="image-holder">
						<img class="covering" v-if="workItem.titleImage" :src="$imagePath(workItem.titleImage.path, 'regular')" />
					</div>
					<div class="item-data">
						<span class="title">{{ workItem.name }}</span>
						<span class="blip"></span>
						<span class="format">{{ workItem.event && workItem.event.format ? workItem.event.format : "Publication" }}</span>
						<span class="contents">{{ !workItem.numberOfSamples ? "No samples" : workItem.numberOfSamples === 1 ? "1 sample" : `${workItem.numberOfSamples} samples` }}</span>
					</div>
				</nuxt-link>
			</section>
		</section>
		<aside class="opt">
			<p>Portfolio site of August Saint Freytag (named as August Freytag, August S. Freytag, A.S.F.), presenting a life overview and work showcases, publications, further platforms and projects and contact options.</p>
			<p>All displayed contents are intellectual property of August Saint Freytag (named as August Freytag, August S. Freytag, A.S.F.), all rights reserved. Denoted contents belong to their respective owners.</p>
		</aside>
	</section>
</template>

<style lang="scss" src="./index-page.scss"></style>

<script lang="ts" src="./index-page.ts"></script>