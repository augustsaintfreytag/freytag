<template>
	<section class="index-page">
		<section class="box-couple" v-for="index in 5" :key="index">
		<div>
			<h2>
				<div class="content-primer">Showcase:</div>
				<div class="content-title">"There I Was"</div>
			</h2>
			<div>
				<p>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
		</div>
		<div>CONTENT!</div>
	</section>
	</section>
</template>

<style lang="scss" src="./index-page.scss">
</style>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import HeaderComponent from "~/components/header/header.vue"

	@Component({
		components: {
			HeaderComponent
		}
	})
	export default class IndexPage extends Vue {}
</script>
