<template>
	<section class="life-page inset">
		<ul class="life-events">
			<li class="life-event" v-for="vitaEvent in vitaEvents" :key="vitaEvent.index">
				<div class="header">
					<div class="blip"></div>
					<h2 class="name">{{ vitaEvent.name }}</h2>
				</div>
				<div class="details">
					<div class="time">{{ formattedDateRange(vitaEvent) }}</div>
					<div class="format">{{ vitaEvent.format }}</div>
					<div class="role">{{ vitaEvent.role }}</div>
					<div class="location">{{ vitaEvent.location }}</div>
					<div class="context">{{ vitaEvent.context }}</div>
				</div>
			</li>
		</ul>
	</section>
</template>

<script lang="ts" src="./life-page.ts"></script>

<style lang="scss" src="./life-page.scss"></style>