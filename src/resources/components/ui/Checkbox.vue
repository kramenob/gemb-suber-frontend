<template>
	<label :class="cn([
		'flex items-start space-x-2 select-none',
		'px-1',
		checkless ? 'cursor-default' : 'cursor-pointer',
	])">
		<input
			type="checkbox"
			class="sr-only"
			:checked="modelValue"
			:disabled="disabled"
			@change="onChange"
		/>
		<span :class="cn([
			'smooth',
			'flex items-center justify-center',
			'w-5 h-5 aspect-square',
			'border-[calc(var(--px)*1.5)]',
			'text-background',
			checkless
				? [ 'bg-foreground', 'border-foreground', ]
				: [
						'border-brand',
						 modelValue
							? 'bg-brand'
							: 'bg-background',
					],
			
		])">
			<svg
				v-if="checkless || modelValue"
				xmlns="http://www.w3.org/2000/svg"
				width="11"
				height="9"
				fill="none"
				viewBox="0 0 11 9"
				:class="cn([ 'overflow-visible', 'transform -translate-x-[calc(var(--px)*.5)]', ])"
			>
				<path
					fill="currentColor"
					stroke="currentColor"
					stroke-width=".5"
					d="M10.118.251c.189-.01.343.08.456.209.11.126.176.278.176.448s-.066.321-.176.447L4.38 8.472a.76.76 0 0 1-.58.278.75.75 0 0 1-.58-.278L.418 5.252a.68.68 0 0 1 .005-.897.57.57 0 0 1 .434-.216c.182 0 .328.094.436.217L3.8 7.24 9.703.46a.58.58 0 0 1 .415-.209Z"
				/>
			</svg>
		</span>
		<span class="text-sm leading-snug pt-0.5">
			<slot />
		</span>
	</label>
</template>

<script lang="ts" setup>

	import { cn } from '@/utils'

	defineProps<{
		modelValue?: boolean
		disabled?:   boolean
		checkless?:  boolean
	}>()

	const emit = defineEmits<{
		(e: 'update:modelValue', value: boolean): void
	}>()

	function onChange(e: Event) {
		const target = e.target as HTMLInputElement
		emit('update:modelValue', target.checked)
	}

</script>