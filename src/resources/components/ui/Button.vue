<template>
	<button :class="cn([
		'smooth',
		'flex items-center justify-center',
		'min-w-60 w-full',
		'px-6 py-3',
		disabled
			? [
				'',
				'text-white',
				'bg-gray-dark',
				'cursor-not-allowed',
		] : [
				'text-white',
				'bg-brand',
				'md:hover:bg-brand-dark md:active:bg-brand-deep active:bg-brand-deep',
				'cursor-pointer',
				]
	], props.class)">
		<slot />
	</button>
</template>

<script lang="ts" setup>

	import type { HTMLAttributes } from 'vue'

	import { cn } from '@/utils'

	const props = defineProps<{
		disabled?: boolean
		class?: HTMLAttributes['class']
	}>()

</script>