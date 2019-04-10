<template>
	<section class="content-block video-vimeo-block inset" v-if="contentBlock">
		<vimeo-player-component :videoCode="contentBlock.videoCode" :videoAspectValue="contentBlock.videoAspectValue" />
	</section>
</template>

<style lang="scss" src="./video-vimeo-block.scss"></style>

<script lang="ts" src="./video-vimeo-block.ts"></script>