<template>
	<nav>
		<nuxt-link tag="div" v-for="route in [
			{address: '/', name: 'Home'},
			{address: '/life', name: 'Life'},
			{address: '/work', name: 'Work'},
			{address: '/impress', name: 'Impress'},
		]" :key="route.address" :to="route.address">
			<a>{{ route.name }}</a>
		</nuxt-link>
	</nav>
</template>

<style lang="scss" src="./navigation.scss"></style>