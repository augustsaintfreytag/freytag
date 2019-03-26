<template>
	<section class="life-event-card kind-blip-colored" :class="`kind-${lifeEvent.kind.toLowerCase()}`" v-if="lifeEvent">
		<section class="decorations">
			<div class="close">
				<svg class="icon">
					<use xlink:href="#close-button"></use>
				</svg>
			</div>
		</section>
		<header>
			<div class="blip"></div>
			<h2>{{ lifeEvent.name }}</h2>
		</header>
		<section class="details">
			<life-event-detail-table-component :life-event="lifeEvent" row-names="['Span', 'Kind', 'Format', 'Role', 'Location']" />
		</section>
		<section class="context" v-if="lifeEvent.context">
			{{ lifeEvent.context }}
		</section>
		<section class="description" v-if="lifeEvent.description">
			{{ lifeEvent.description }}
		</section>
		<nav>
			<div class="previous" :class="{ active: previousLifeEvent !== undefined }" v-on:click="requestLifeEvent(previousLifeEvent ? previousLifeEvent.meta.id : undefined)">
				<span class="indicator">&lt;</span>
				<span v-if="previousLifeEvent">
					{{ truncated(previousLifeEvent.name) }}
				</span>
				<span v-else>
					No event
				</span>
			</div>
			<div class="next" :class="{ active: nextLifeEvent !== undefined }" v-on:click="requestLifeEvent(nextLifeEvent ? nextLifeEvent.meta.id : undefined)">
				<span v-if="nextLifeEvent">
					{{ truncated(nextLifeEvent.name) }}
				</span>
				<span v-else>
					No event
				</span>
				<span class="indicator">&gt;</span>
			</div>
		</nav>
	</section>
</template>

<style lang="scss" src="./life-event-card.scss"></style>

<script lang="ts" src="./life-event-card.ts"></script>