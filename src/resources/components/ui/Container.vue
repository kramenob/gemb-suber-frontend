<template>
	<div :class="cn([
		'w-full max-w-(--container)',
		'px-(--padding)',
	])">
		<slot />
	</div>
</template>

<script lang="ts" setup>

	import { cn } from '@/utils'

</script>