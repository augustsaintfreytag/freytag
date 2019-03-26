<template>
	<section class="life-event-card kind-blip-colored" :class="`kind-${lifeEvent.kind.toLowerCase()}`" v-if="lifeEvent">
		<header>
			<div class="blip"></div>
			<h2>{{ lifeEvent.name }}</h2>
		</header>
		<section class="details">
			<life-event-detail-table-component :life-event="lifeEvent" row-names="['Span', 'Kind', 'Format', 'Role']" />
		</section>
		<section class="context" v-if="lifeEvent.context">
			{{ lifeEvent.context }}
		</section>
		<section class="description" v-if="lifeEvent.description">
			{{ lifeEvent.description }}
		</section>
		<nav>
			<div class="previous">
				<span class="arrow">&lt;</span>
				<span v-if="previousLifeEvent">
					{{ previousLifeEvent.name }}
				</span>
				<span v-else>
					No event
				</span>
			</div>
			<div class="next">
				<span v-if="nextLifeEvent">
					{{ nextLifeEvent.name }}
				</span>
				<span v-else>
					No event
				</span>
				<span class="arrow">&gt;</span>
			</div>
		</nav>
	</section>
</template>

<style lang="scss" src="./life-event-card.scss"></style>

<script lang="ts" src="./life-event-card.ts"></script>