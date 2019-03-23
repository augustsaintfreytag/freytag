<template>
	<div id="page">
		<div class="wrap">
			<header-component />
			<main v-lazy-container="{ selector: 'img[data-src]' }">
				<nuxt />
			</main>
			<footer-component />
		</div>
		<sprite-set />
	</div>
</template>

<style lang="scss" src="./default.scss"></style>

<script lang="ts" src="./default.ts"></script>