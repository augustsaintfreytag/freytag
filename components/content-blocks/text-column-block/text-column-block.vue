<template>
	<section class="content-block text-column-block inset" v-if="contentBlock">
		<p v-for="(paragraph, index) in textParagraphs" :key="index">{{ paragraph }}</p>
	</section>
</template>

<style lang="scss" src="./text-column-block.scss"></style>

<script lang="ts" src="./text-column-block.ts"></script>