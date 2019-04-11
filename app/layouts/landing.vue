<template>
	<div id="page">
		<div class="wrap">
			<header class="page-header inset">
				<section class="branding"></section>
				<header-navigation-component />
			</header>
			<main>
				<nuxt />
			</main>
			<footer-component />
		</div>
		<sprite-set />
	</div>
</template>

<script lang="ts" src="./landing.ts"></script>