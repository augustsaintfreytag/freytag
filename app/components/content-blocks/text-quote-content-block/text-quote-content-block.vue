<template>
	<section class="content-block text-quote-content-block inset" v-if="contentBlock">
		<p>{{ contentBlock.textContent }}</p>
	</section>
</template>

<style lang="scss" src="./text-quote-content-block.scss"></style>

<script lang="ts" src="./text-quote-content-block.ts"></script>