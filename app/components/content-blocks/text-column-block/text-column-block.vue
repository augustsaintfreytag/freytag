<template>
	<section class="content-block text-column-block text inset" v-if="contentBlock">
		<vue-markdown>{{ contentBlock.textContent }}</vue-markdown>
	</section>
</template>

<style lang="scss" src="./text-column-block.scss"></style>

<script lang="ts" src="./text-column-block.ts"></script>