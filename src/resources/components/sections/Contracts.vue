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
			<h2>Договоры к оплате</h2>
		</div>
		<!-- description -->
		<div :class="cn([
			'flex flex-col items-center',
			'w-full max-w-[calc(var(--px)*1000)]',
		])">
			<p>Каждая услуга оплачивается по отдельному договору. Необходимо в карточке каждого договора перейти к оплате, указать контактные e-mail и номер телефона и нажать оплатить — Вы окажетесь в платёжной форме Альфа-Банка, следуйте её указаниям для совершения оплаты.</p>
		</div>
		<!-- cards -->
		<div :class="cn([
			'grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', '',
		])">
			<CardContract v-for="(i, k) in contracts" :key="k" :data="i" :delay="k * 100" />
		</div>
		<!-- results -->
		<div :class="cn([
			'flex flex-col',
			'w-full',
		])">
			<p>Общая стоимость тарифа: {{ formatPrice(paymentSum, false) }} рублей.</p>
			<p>Общая сумма ежемесячного списания: {{ paymentPart && formatPrice(paymentPart, false) }} рублей.</p>
		</div>
	</div>

</template>

<script lang="ts" setup>

	import { computed } from 'vue';
	
	import type { Contract } from '@/services/types'

	import { CardContract } from '@/resources/components/ui';

	import { cn, formatPrice } from '@/utils';

	const props = defineProps<{
		data: Contract[]
	}>()

	const contracts = computed(() => props.data ?? {})

	const paymentSum = computed(() => {
		return (props.data ?? []).reduce((sum, contract) => {
			return sum + contract.price
		}, 0)
	})

	const paymentPart = computed(() => {
		return paymentSum.value
			? Math.floor(paymentSum.value / 12)
			: null
	})

</script>