<template>
	<section class="content-block text-column-block inset" v-if="contentBlock">
		<p>{{ contentBlock.textContent }}</p>
	</section>
</template>

<style lang="scss" src="./text-column-block.scss"></style>

<script lang="ts" src="./text-column-block.ts"></script>