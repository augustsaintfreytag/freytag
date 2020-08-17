<template>
	<section class="content-block video-vimeo-content-block inset" v-if="contentBlock">
		<vimeo-player :videoCode="contentBlock.videoCode" :videoAspectValue="contentBlock.videoAspectValue" />
	</section>
</template>

<style lang="scss" src="./video-vimeo-content-block.scss"></style>

<script lang="ts" src="./video-vimeo-content-block.ts"></script>