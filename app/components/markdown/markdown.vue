<template>
	<vue-markdown :anchor-attributes="{ target: '_blank', rel: 'noopener' }">
		<slot></slot>
	</vue-markdown>
</template>

<script lang="ts" src="./markdown.ts"></script>