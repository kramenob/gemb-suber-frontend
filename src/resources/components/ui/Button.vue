<template>
	<button :class="cn([
		'smooth',

		'flex items-center justify-center',
		'min-w-60 w-full',

		'text-background',
		'bg-brand',

		'px-6 py-3',
		'',
		
		'md:hover:bg-brand-dark md:active:bg-brand-deep active:bg-brand-deep',

		'cursor-pointer',
	], props.class)">
		<slot />
	</button>
</template>

<script lang="ts" setup>

	import type { HTMLAttributes } from 'vue'

	import { cn } from '@/utils'

	const props = defineProps<{
		class?: HTMLAttributes['class']
	}>()

</script>