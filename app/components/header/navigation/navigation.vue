<template>
	<nav class="page-navigation indicating-navigation">
		<nuxt-link class="navigation-element" tag="div" v-for="route in [
			{address: '/', name: 'Home'},
			{address: '/life', name: 'Life'},
			{address: '/work', name: 'Work'},
			{address: '/imprint', name: 'Imprint'},
		]" :key="route.address" :to="route.address" :title="`${route.name} (${route.address})`">
			<a>{{ route.name }}</a>
		</nuxt-link>
	</nav>
</template>

<style lang="scss" src="./navigation.scss"></style>