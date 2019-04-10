<template>
	<section class="content-block text-column-block text inset" v-if="contentBlock">
		<markdown>{{ contentBlock.textContent }}</markdown>
		<aside class="opt">{{ contentBlock.textContent }}</aside>
	</section>
</template>

<style lang="scss" src="./text-column-block.scss"></style>

<script lang="ts" src="./text-column-block.ts"></script>