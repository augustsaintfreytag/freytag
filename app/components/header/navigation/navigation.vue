<template>
	<nav class="page-navigation indicating-navigation">
		<nuxt-link class="navigation-element" tag="div" v-for="route in routes" :key="route.address" :to="route.address" :title="`${route.name} (${route.address})`">
			<a>{{ route.name }}</a>
		</nuxt-link>
	</nav>
</template>

<style lang="scss" src="./navigation.scss"></style>

<script lang="ts" src="./navigation.ts" ></script>