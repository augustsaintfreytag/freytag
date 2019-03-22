<template>
	<section class="work-overview-page">
		<section class="work-overview inset">
			<section class="work-item kind-blip-colored kind-all"
				v-for="workItem in workItems" :key="workItem.meta.id"
				:class="workItem.event && workItem.event.kind ? `kind-${workItem.event.kind.toLowerCase()}` : ''"
			>
				<nuxt-link :to="`/work/${workItem.meta.id}`">
					<div class="image-holder">
						<img class="covering" v-if="workItem.titleImage" :src="$imagePath(workItem.titleImage.path, 'teaser')" />
					</div>
					<div class="item-data">
						<div class="blip"></div>
						<div class="format">{{ workItem.event && workItem.event.format ? workItem.event.format : "Publication" }}</div>
						<div class="contents">{{ !workItem.numberOfSamples ? "No samples" : workItem.numberOfSamples === 1 ? "1 sample" : `${workItem.numberOfSamples} samples` }}</div>
					</div>
					<div class="item-name">
						<h2>{{ workItem.name }}</h2>
					</div>
				</nuxt-link>
			</section>
		</section>
	</section>
</template>

<style lang="scss" src="./work-overview-page.scss"></style>

<script lang="ts" src="./work-overview-page.ts"></script>