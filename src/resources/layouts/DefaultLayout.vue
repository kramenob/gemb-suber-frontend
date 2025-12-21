<template>
	<div :class="cn([
		'flex flex-col',
		'min-h-screen',
	])">
		<Header />
		<main :class="cn([
			'grow',
			'flex flex-col items-center',
		])">
			<slot />
		</main>
		<Footer />
	</div>
</template>

<script setup lang="ts">

	import { cn } from '@/utils'

	import { Header, Footer } from '@/resources/layouts'

</script>