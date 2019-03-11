<template>
	<span>
		<div class="case">
			<div class="wrap">
				<header-component />
				<main>
					<nuxt />
				</main>
				<footer-component />
			</div>
		</div>
		<sprite-set />
	</span>
</template>

<style lang="scss">
	@import "~/assets/style/fonts.scss";
	@import "~/assets/style/base.scss";
</style>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import HeaderComponent from "~/components/header/header.vue"
	import FooterComponent from "~/components/footer/footer.vue"
	import SpriteSet from "~/components/sprite-set/sprite-set.vue"

	@Component({
		components: {
			HeaderComponent,
			FooterComponent,
			SpriteSet
		}
	})
	export default class DefaultLayout extends Vue {

	}
</script>


