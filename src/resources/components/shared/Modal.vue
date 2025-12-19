<template>
	<div
		v-if="isMounted"
		:class="cn([
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
		}, 200) // must match tailwind animation duration
	}

</script>