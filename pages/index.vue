<template>
	<div class="case">
		<div class="wrap">
			<header>
				<div class="branding">
					<h1>{{ content.headerPrimaryTitle }}</h1>
					<section class="tagline">{{ content.headerPrimaryOccupations }}</section>
				</div>
				<div>
					<nav>
					</nav>
				</div>
			</header>
			<main>
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
			</main>
			<footer>
				Footer here.
			</footer>
		</div>
	</div>
</template>

<style lang="scss">
	@import "~/assets/style/fonts.scss";
	@import "./index.scss";
</style>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import HeaderComponent from "~/components/header/header.vue"

	@Component({
		components: {
			HeaderComponent
		},
		async asyncData() {
			return {
				content: {
					headerPrimaryTitle: "August S. Freytag",
					headerPrimaryOccupations: ["Music Video Artist", "Editor", "Concept Designer", "Developer", "Analogue Photographer"].join(" ・ ")
				}
			}
		}
	})
	export default class IndexPage extends Vue {}
</script>
