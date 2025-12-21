<template>

	<div :class="cn([
		'flex flex-col space-y-6',
		'w-full', 'overflow-hidden',
	])">
		<!-- title -->
		<div :class="cn([
			'flex flex-col items-center',
			'w-full',
		])">
			<h2>Как проходит оплата</h2>
		</div>
		<!-- cards -->
		<div :class="cn([
			'grid gap-x-6 grid-cols-1 md:grid-cols-3', '',
		])">
			<CardDemo v-for="(i, k) in cards" :key="i.heading" :data="{ ...i, delay: k * 100 }" />
		</div>
	</div>

</template>

<script lang="ts" setup>

	import { cn } from '@/utils';
	import { CardDemo } from '@/resources/components/ui';

	const cards = [
		{
			picture:     '635fbe6b-9366-4b0f-8215-26343a818ac3.jpg',
			heading:     'Ежемесячное списание',
			description: 'Списание производится автоматически 1 раз в месяц, в день оплаты убедитесь, что на карте достаточно средств',
		},
		{
			picture:     '04ba2e33-49fe-4276-8be7-16e7aaa2463b.jpg',
			heading:     'Чек об оплате',
			description: 'Каждое ежемесячное списание сопровождается чеком на электронную почту',
		},
		{
			picture:     'ebe5bcbd-4a95-4ba6-ad85-947768b73a55.jpg',
			heading:     'Проверка «Спама»',
			description: 'Если чек не удаётся найти на почте, проверьте папки «Спам» или «Промоакции»',
		}
	]

</script>