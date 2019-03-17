<template>
	<section class="work-pages work-detail-page">
		<section class="cover">
			<div class="image-holder">
				<img v-if="workItem.titleImage" v-bind:src="$root.managedResourcePath(workItem.titleImage.path)" />
			</div>
			<div class="title-holder">
				<h2>{{ workItem.name }}</h2>
			</div>
			<div class="scroll-indicator">
				<svg class="icon">
					<use xlink:href="#scroll-indicator"></use>
				</svg>
			</div>
		</section>
		<section class="introduction inset">
			<section class="details">
				<table>
					<tbody>
						<tr v-for="row in detailsRows" :key="row.name">
							<td class="label">{{ row.name }}</td>
							<td class="text">{{ row.value }}</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section class="description">
				{{ workItem.description }}
			</section>
		</section>
		<image-columns-block-component />
	</section>
</template>

<style lang="scss" src="./work-detail-page.scss"></style>

<script lang="ts" src="./work-detail-page.ts"></script>