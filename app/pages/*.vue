<template></template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import { Context } from "@nuxt/vue-app-edge"

	@Component({
		layout: "maintenance",

		async asyncData(context: Context) {
			return context.redirect(404, "/404")
		}
	})
	export default class ErrorPage extends Vue {}
</script>