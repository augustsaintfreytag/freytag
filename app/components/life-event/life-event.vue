<template>
	<section class="kind-blip-colored" :class="`life-event kind-${lifeEvent.kind.toLowerCase()}`">
		<div class="header">
			<div class="blip" :title="lifeEvent.kind"></div>
			<h2 class="name">{{ lifeEvent.name }}</h2>
		</div>
		<div class="details">
			<div class="time">{{ formattedDateRange }}</div>
			<div class="format">{{ lifeEvent.format }}</div>
			<div class="role" :title="lifeEvent.role">{{ lifeEvent.role }}</div>
			<div class="location" :title="lifeEvent.location">{{ lifeEvent.location }}</div>
			<div class="context" :title="lifeEvent.context">{{ lifeEvent.context }}</div>
		</div>
	</section>
</template>

<style lang="scss" src="./life-event.scss"></style>

<script lang="ts" src="./life-event.ts"></script>