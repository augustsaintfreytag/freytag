<template>
	<div class="vimeo-player" style="padding:75% 0 0 0;position:relative;">
		<iframe :src="`https://player.vimeo.com/video/${videoCode}?color=ffffff&byline=0&portrait=0`" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
		<script src="https://player.vimeo.com/api/player.js"></script>
	</div>
</template>

<script lang="ts" src="./vimeo-player.ts"></script>