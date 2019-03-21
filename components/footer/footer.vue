<template>
	<footer>
		<div id="guide"></div>
		<div class="wrap inset">
			<div class="inlay">
				<section class="personal">
					<header>Me</header>
					<main>
						<div>me@augustfreytag.com</div>
						<div>Columbiadamm<br />Berlin<br />Germany</div>
					</main>
				</section>
				<section class="map">
					<header>Map</header>
					<main class="indicating-navigation">
						<nuxt-link class="navigation-element" v-for="route in mapRoutes" :key="route.address" :to="route.address">
							<div class="route">
								<div class="name">{{ route.name }}</div>
								<div class="address">{{ route.address }}</div>
							</div>
						</nuxt-link>
					</main>
				</section>
				<section class="public">
					<header>Public</header>
					<main></main>
				</section>
				<section class="further">
					<header>Further</header>
					<main></main>
				</section>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" src="./footer.scss"></style>

<script lang="ts" src="./footer.ts"></script>