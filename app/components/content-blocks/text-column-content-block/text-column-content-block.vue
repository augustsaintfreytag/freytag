<template>
	<section class="content-block text-column-content-block text inset" v-if="contentBlock">
		<markdown :content="contentBlock.textContent"></markdown>
	</section>
</template>

<style lang="scss" src="./text-column-content-block.scss"></style>

<script lang="ts" src="./text-column-content-block.ts"></script>