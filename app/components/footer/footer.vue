<template>
	<footer>
		<div class="wrap inset">
			<div class="inlay">
				<section class="personal">
					<header>Me</header>
					<main>
						<div>{{ mail }}</div>
						<div>Columbiadamm, Berlin<br />Germany</div>
					</main>
				</section>
				<section class="map">
					<header>Map</header>
					<main class="indicating-navigation">
						<nuxt-link class="navigation-element" v-for="link in mapLinks" :key="link.address" :to="link.address">
							<div class="route">
								<div class="name">{{ link.name }}</div>
								<div class="address">{{ link.address }}</div>
							</div>
						</nuxt-link>
					</main>
				</section>
				<section class="public">
					<header>Public</header>
					<main>
						<a v-for="link in platformLinks" :key="link.address" :href="`https://${link.address}`" target="_blank" rel="noopener">
							<div class="platform-link">
								<div class="sprite">
									<svg class="icon">
										<use :xlink:href="`#${link.spriteId}`"></use>
									</svg>
								</div>
								<div class="address">{{ link.address }}</div>
							</div>
						</a>
					</main>
				</section>
				<section class="further">
					<header>Further</header>
						<main>
						<a v-for="link in furtherLinks" :key="link.address" :title="link.name" :href="`https://${link.address}`" target="_blank" rel="noopener">
							<div class="route">
								<div class="name">{{ link.address }}</div>
							</div>
						</a>
					</main>
				</section>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" src="./footer.scss"></style>

<script lang="ts" src="./footer.ts"></script>