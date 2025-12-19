<template>
	<input
		:type="type"
		:placeholder="placeholder"
		:name="name"
		:class="cn([
			'smooth',
			'w-full',
			'px-1 py-2',
			'placeholder:text-gray focus:placeholder:text-gray-dark',
			'text-foreground',
			'border-b border-gray-dark', 'focus:border-foreground',
			'focus:outline-none',
		])"
		:value="modelValue"
		@input="onInput"
	/>
</template>

<script setup lang="ts">

	import { cn } from '@/utils'

	defineProps<{
		modelValue:   string
		type?:        string
		placeholder?: string
		name?:        string
	}>()

	const emit = defineEmits<{
		(e: 'update:modelValue', value: string): void
	}>()

	const onInput = (e: Event) => {
		emit('update:modelValue', (e.target as HTMLInputElement).value)
	}

</script>