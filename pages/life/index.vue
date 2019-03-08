<template>
	<section class="life-page inset">
		<ul class="life-events">
			<li class="life-event" v-for="vitaEvent in vitaEvents" :key="vitaEvent.index">
				<div class="blip"></div>
				<h2 class="event-text">{{ vitaEvent.name }}</h2>
				<div class="event-text time">{{ formattedDateRange(vitaEvent) }}</div>
				<!--<div class="spacer"></div>-->
				<div class="event-text format">{{ vitaEvent.format }}</div>
				<div class="event-text role">{{ vitaEvent.role }}</div>
			</li>
		</ul>
	</section>
</template>

<script lang="ts" src="./life-page.ts"></script>

<style lang="scss" src="./life-page.scss"></style>