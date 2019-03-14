<template>
	<header class="inset">
		<div class="branding">
			<h1>{{ content.headerPrimaryTitle }}</h1>
			<section class="tagline">{{ content.headerPrimaryOccupations }}</section>
		</div>
		<nav>
			<nuxt-link tag="div" v-for="route in [
				{address: '/', name: 'Home'},
				{address: '/life', name: 'Life'},
				{address: '/work', name: 'Work'},
				{address: '/hello', name: 'Contact'},
			]" :key="route.address" v-bind:to="route.address">
				<a>{{ route.name }}</a>
			</nuxt-link>
		</nav>
	</header>
</template>

<style lang="scss" src="./header.scss"></style>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"

	@Component
	export default class HeaderComponent extends Vue {
		data() {
			return {
				content: {
					headerPrimaryTitle: "August S. Freytag",
					headerPrimaryOccupations: ["Music Video Artist", "Editor", "Concept Designer", "Developer", "Analogue Photographer"].join(" ・ ")
				}
			}
		}
	}
</script>