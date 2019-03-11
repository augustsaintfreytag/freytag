<template>
	<section class="life-page inset">
		<div class="life-events-header">
			<div class="details">
				<div
					v-for="element in [
						{className: 'time', name: 'Span', sortable: true},
						{className: 'format', name: 'Format', sortable: true},
						{className: 'role', name: 'Role', sortable: false},
						{className: 'location', name: 'Location', sortable: false},
						{className: 'context', name: 'Context', sortable: false}
					]" 
					:key="element.className" 
					v-bind:class="[element.className, { sortable: element.sortable, reversed: lifeSortingIsReversed, active: (lifeSortingMode === element.className) }]" 
					v-on:click="didToggleSorting(element.className)"
					v-bind:data-sorting-kind="element.className"
				>
					<span>{{ element.name }}</span>
					<div class="sort-switch">
						<svg class="icon">
							<use xlink:href="#sorting-switch"></use>
						</svg>
					</div>
				</div>
			</div>
		</div>
		<ul class="life-events">
			<li v-bind:class="`life-event kind-${lifeEvent.kind.toLowerCase()}`" v-for="lifeEvent in lifeEvents" :key="lifeEvent.index">
				<div class="header">
					<div class="blip"></div>
					<h2 class="name">{{ lifeEvent.name }}</h2>
				</div>
				<div class="details">
					<div class="time">{{ formattedDateRange(lifeEvent) }}</div>
					<div class="format">{{ lifeEvent.format }}</div>
					<div class="role">{{ lifeEvent.role }}</div>
					<div class="location">{{ lifeEvent.location }}</div>
					<div class="context">{{ lifeEvent.context }}</div>
				</div>
			</li>
		</ul>
	</section>
</template>

<script lang="ts" src="./life-page.ts"></script>

<style lang="scss" src="./life-page.scss"></style>