<template>
	<table>
		<tbody>
			<tr v-for="row in detailRows" :key="row.name">
				<td class="label">{{ row.name }}</td>
				<td class="text">{{ row.value }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script lang="ts" src="./life-event-detail-table.ts"></script>