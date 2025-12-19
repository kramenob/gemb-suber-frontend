<template>
	<div :class="cn([ '', ])">
		<!-- picture -->
		<div :class="cn([ '', ])">
			<figure class="
				relative
				overflow-hidden
				w-full aspect-375/300
			">
				<figure
					:class="cn([
						'delay-100',
						!delayDone
							? 'visible opacity-100'
							: 'invisible opacity-0',
						'absolute top-0 left-0 inset-0 z-1',
						'w-full h-full',
						'skeleton',
					])"
				/>
				<img
					:src="`/i/${picture}`"
					:alt="heading"
					:class="cn([
						isImageVisible
							? 'visible opacity-100'
							: 'invisible opacity-0',
						'transition-all',
						'absolute', 'z-2',
						'top-1/2 left-1/2',
						'transform -translate-1/2',
						'w-full h-full xl:h-auto',
						'object-cover',
					])"
					@load="onImageLoad"
				/>
			</figure>
		</div>
		<div :class="cn([
			'flex flex-col space-y-4',
			'p-4 md:p-6 lg:p-8',
			'',
		])">
			<!-- heading -->
			<div :class="cn([ '', ])">
				<h3 :class="cn([ 'text-brand uppercase', 'md:min-h-14 lg:min-h-auto', ])">{{ heading }}</h3>
			</div>
			<Divider />
			<!-- description -->
			<div :class="cn([ '', ])">
				<p>{{ description }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

	import { ref } from 'vue'

	import { Divider } from '@/resources/components/ui'

	import { cn } from '@/utils'

	const props = defineProps<{
		data: any
	}>()

	const raw = props.data || null

	const heading     = raw?.heading     || null
	const description = raw?.description || null
	const delay       = raw?.delay       || 0
	const picture     = raw?.picture     || null

	const isImageLoaded = ref(false)
	const delayDone = ref(false)
	const isImageVisible = ref(false)

	function onImageLoad() {
		isImageLoaded.value = true

		if (delay > 0) {
			setTimeout(() => {
				delayDone.value = true
				isImageVisible.value = true
			}, delay)
		} else {
			delayDone.value = true
			isImageVisible.value = true
		}
	}

</script>