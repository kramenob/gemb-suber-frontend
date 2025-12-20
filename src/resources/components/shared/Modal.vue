<template>
	<div
		v-if="isMounted"
		:class="cn([ 'z-max',
			'fixed top-0 left-0',
			'w-screen h-screen',
		])"
	>

		<!-- content -->
		<div :class="cn([ 'z-max',
			'smooth delay-100',
			'absolute', 'bottom-0 sm:top-5/11 sm:left-1/2', 'transform sm:-translate-1/2',
			'w-full max-w-[calc(var(--px)*680)] h-fit',
			'sm:px-5',
		])">
			<button
				v-if="!closeless"
				@click="close"
				:class="cn([
					'absolute top-0 transform',
					'right-1/2', 'translate-x-1/2',
					'sm:right-5', 'sm:translate-x-0',
					'w-16 h-8 sm:w-12 sm:h-12 sm:aspect-square',
					'cursor-pointer',
				])"
			>
				<!-- desktop -->
				<svg :class="cn([ 'hidden sm:block', 'absolute top-1/2 left-1/2 transform -translate-1/2', ])" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 1 1 13M1 1l12 12"/></svg>
				<!-- mobile -->
				<svg :class="cn([ 'block sm:hidden', 'absolute top-1/2 left-1/2 transform -translate-1/2', 'text-gray', ])" xmlns="http://www.w3.org/2000/svg" width="51" height="11" fill="none" viewBox="0 0 51 11"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m49.5 1.5-48 8m0-8 48 8"/></svg>
			</button>
			<div :class="cn([
				'smooth',
				'w-full h-fit', 'min-h-[60vh] sm:min-h-0 ',
				'px-8 md:px-16', 'pt-8 pb-24 sm:py-8',
				'rounded-t-4xl sm:rounded-none',
				'bg-background',
			])">
				<slot />
			</div>
		</div>

		<!-- background -->
		<figure
			@click="close"
			:class="cn([
				'smooth delay-100',
				'absolute top-0 left-0',
				'w-screen h-screen',
				isVisible ? 'bg-foreground/32' : 'bg-foreground/0',
			])"
		></figure>

	</div>
</template>

<script setup lang="ts">

	import { cn } from '@/utils'
	import { ref, watch, onMounted } from 'vue'

	const props = defineProps<{
		opened?: boolean
		closeless?: boolean
	}>()

	const isVisible = ref(false)
	const isMounted = ref(false)

	const emit = defineEmits<{
		(e: 'close'): void
	}>()

	// Open modal on mount if opened prop is true
	onMounted(() => {
		if (props.opened) {
			isMounted.value = true
			requestAnimationFrame(() => {
				isVisible.value = true
			})
		}
	})

	// Watch for opened prop changes
	watch(
		() => props.opened,
		(value) => {
			if (value) {
				isMounted.value = true
				requestAnimationFrame(() => {
					isVisible.value = true
				})
			} else {
				close()
			}
		}
	)

	function close() {
		if (props.closeless) return

		isVisible.value = false
		setTimeout(() => {
			isMounted.value = false
			emit('close')
		}, 200)
	}

</script>