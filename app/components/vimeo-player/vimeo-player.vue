<template>
	<div class="vimeo-player" :style="{ 'padding-top': videoAspectValue || '75%' }">
		<iframe :src="`https://player.vimeo.com/video/${videoCode}?color=ffffff&byline=0&portrait=0`" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
		<script src="https://player.vimeo.com/api/player.js"></script>
	</div>
</template>

<style lang="scss" src="./vimeo-player.scss"></style>


<script lang="ts" src="./vimeo-player.ts"></script>