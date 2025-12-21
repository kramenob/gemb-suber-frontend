<template>
	<div :class="cn([
		'flex flex-col items-center',
		'',
	])">
		<div :class="cn([
			'flex flex-col items-center',
			'w-full max-w-[calc(var(--px)*800)]',
			'text-center text-lg',
			'',
		])">
			<p>Остались вопросы? Позвоните по единому телефону <a href="tel:8 (800) 250-90-05" :class="cn([ 'smooth', 'md:hover:text-brand md:active:text-brand-dark active:text-brand-dark', ])">8 (800) 250-90-05</a> и получите консультацию специалиста Гемабанка. Звонок по России бесплатный.</p>
		</div>
	</div>
</template>

<script lang="ts" setup>

	import { cn } from '@/utils'

</script>