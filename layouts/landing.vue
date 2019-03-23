<template>
	<div id="page">
		<div class="wrap">
			<header class="inset">
				<section></section>
				<header-navigation-component />
			</header>
			<main v-lazy-container="{ selector: 'img[data-src]' }">
				<nuxt />
			</main>
			<footer-component />
		</div>
		<sprite-set />
	</div>
</template>

<style lang="scss"></style>

<script lang="ts" src="./landing.ts"></script>