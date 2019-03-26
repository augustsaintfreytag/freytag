<template>
	<section class="life-page inset">
		<div class="life-events-filter">
			<div 
				class="kind-blip-colored"
				v-for="definition in eventToggleDefinitions" :key="definition.identifier"
				:class="[
					definition.identifier,
					(definition.filter ? `kind-${definition.filter.toLowerCase()}` : 'kind-all'),
					{ active: (lifeFilter === definition.filter) }
				]"
				v-on:click="didToggleFilter($event, definition.filter)"
			>
				<div class="blip active-indicator"></div>
				<div class="name">{{ definition.name }}</div>
			</div>
		</div>
		<div class="life-events-header">
			<div class="details">
				<div
					v-for="definition in eventHeaderDefinitions" :key="definition.identifier"
					:class="[definition.identifier, {
						sortable: definition.sortable, 
						reversed: lifeSortingIsReversed, 
						active: (lifeSortingMode === definition.identifier) 
					}]"
					v-on:click="didToggleSorting($event, definition.identifier)"
					:data-sorting-kind="definition.identifier"
				>
					<span>{{ definition.name }}</span>
					<div class="sort-switch">
						<svg class="icon">
							<use xlink:href="#sorting-switch"></use>
						</svg>
					</div>
				</div>
			</div>
		</div>
		<ul class="life-events" ref="life-event-listing">
			<li v-for="lifeEvent in lifeEvents" :key="lifeEvent.index" v-on:click="didRequestLifeEvent(lifeEvent.meta.id)">
				<life-event-component :life-event="lifeEvent" title="Open Event in Overlay" />
			</li>
		</ul>
		<aside class="life-event-card-holder" :class="{ hidden: lifeSelectedItemId === undefined }">
			<life-event-card-component v-if="lifeSelectedItemId" :life-event-set="lifeSelectedItemSet" v-on:didRequestLifeEvent="didRequestLifeEvent" />
			<div class="overlay" v-on:click="didRequestLifeEvent()" title="Close Overlay"></div>
		</aside>
	</section>
</template>

<script lang="ts" src="./life-page.ts"></script>

<style lang="scss" src="./life-page.scss"></style>