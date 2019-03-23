<template>
	<section class="content-block text-quote-block inset" v-if="contentBlock">
		<p>{{ contentBlock.textContent }}</p>
	</section>
</template>

<style lang="scss" src="./text-quote-block.scss"></style>

<script lang="ts" src="./text-quote-block.ts"></script>