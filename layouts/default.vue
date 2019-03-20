<template>
	<div id="page">
		<div class="wrap">
			<header-component />
			<main>
				<nuxt />
			</main>
			<footer-component />
		</div>
		<sprite-set />
	</div>
</template>

<style lang="scss">
	@import "~/assets/style/fonts.scss";
	@import "~/assets/style/base.scss";
</style>

<script lang="ts" src="./default.ts"></script>


