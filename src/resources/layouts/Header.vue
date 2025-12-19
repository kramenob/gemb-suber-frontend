<template>
	<header>
		<div :class="cn([
			'h-[calc(var(--px)*96)]',
			'bg-background',
		])"></div>
		<div :class="cn([
			'h-[calc(var(--px)*65)]',
			'bg-brand',
		])"></div>
	</header>
</template>

<script lang="ts" setup>

	import { cn } from '@/utils'
	import { Container } from '@/resources/components/ui'

</script>