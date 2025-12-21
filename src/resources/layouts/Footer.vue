<template>
	<footer>
		<div :class="cn([
			'h-[calc(var(--px)*600)]',
			'bg-nymph',
		])"></div>
	</footer>
</template>

<script lang="ts" setup>

	import { cn } from '@/utils'
	import { Container } from '@/resources/components/ui'

</script>