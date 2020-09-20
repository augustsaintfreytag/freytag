<template>
	<div id="page">
		<div class="wrap">
			<header class="page-header inset">
				<section class="branding"></section>
				<page-header-navigation />
			</header>
			<main>
				<nuxt />
			</main>
			<page-footer />
		</div>
		<sprite-set />
	</div>
</template>

<script lang="ts" src="./landing-layout.ts"></script>