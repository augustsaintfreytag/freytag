<template>
	<section class="content-block image-columns-block inset" v-if="contentBlock" :class="`content-${ imageContentDesignation }`">
		<div v-for="(imageContent, index) in contentBlock.imageContents" :key="index">
			<div class="image-holder">
				<img class="covering" :data-src="$imagePath(imageContent.path, 'regular')" />
			</div>
			<div class="label">{{ imageContent.caption }}</div>
		</div>
	</section>
</template>

<style lang="scss" src="./image-columns-block.scss"></style>

<script lang="ts" src="./image-columns-block.ts"></script>