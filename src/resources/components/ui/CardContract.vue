<template>
	<div :class="cn([
		'flex flex-col space-y-4',
		'',
		'pt-6 pb-8 px-4',
		'',
		'bg-gray-light',
	])">
		<!-- heading -->
		<div :class="cn([
			'',
			'',
		])">
			<h3>{{ heading }}</h3>
		</div>
		<!-- about -->
		<div :class="cn([
			'flex flex-col space-y-1',
			'',
		])">
			<div
				v-for="i in about"
				:class="cn([
					'flex flex-row space-x-8',
				])"
			>
				<span :class="cn([ 'block',           'font-light text-nowrap',   ])">{{ i.label }}<span :class="cn([ 'sr-only', ])">{{ ':' }}</span></span>
				<span :class="cn([ 'block', 'w-full', i === about[about.length - 1] && 'sm:min-h-18', 'text-right font-semibold', ])">{{ i.value }}<span :class="cn([ 'sr-only', ])">{{ i === about[about.length - 1] ? '.' : ';' }}</span></span>
			</div>
		</div>

		<Divider />

		<!-- cost -->
		<div :class="cn([
			'flex flex-col space-y-4',
			'',
		])">
			<div :class="cn([
				'flex flex-col space-y-1',
				'',
			])">
				<span :class="cn([ 'text-lg font-medium', ])">{{ 'Условия оплаты' }}</span>
				<div
					v-for="i in price"
					:class="cn([
						'flex flex-row space-x-8',
						'',
					])"
				>
					<span :class="cn([ 'block',           'font-light text-nowrap',   ])">{{ i.label }}<span :class="cn([ 'sr-only', ])">{{ ':' }}</span></span>
					<span :class="cn([ 'block', 'w-full', 'text-right font-semibold', ])">{{ formatPrice(i.value) }}<span :class="cn([ 'sr-only', ])">{{ i === about[about.length - 1] ? '.' : ';' }}</span></span>
				</div>
			</div>
			<!-- caption -->
			<div :class="cn([
				'flex flex-col space-y-2', 'items-center',
				'w-full',
				'py-1',
			])">
				<div :class="cn([
					'flex flex-row space-x-2',
				])">
					<figure v-for="i in 12" :key="i" :class="cn([ 'w-2 aspect-square rounded-full bg-gray', ])"></figure>
				</div>
				<span :class="cn([ 'text-sm font-light', ])">{{ '12 равных платежей' }}</span>
			</div>
		</div>
		<!-- submit -->
		<div :class="cn([
			'flex flex-col items-center',
			'w-full',
		])">
			<Button :class="cn([ 'w-fit', ])">{{ 'Оплатить договор' }}</Button>
		</div>
	</div>
</template>

<script lang="ts" setup>

	import { ref } from 'vue'

	import type { Contract } from '@/services/types'

	import { Divider, Button } from '@/resources/components/ui'

	import { cn, formatPrice } from '@/utils'

	const props = defineProps<{
		data:   Contract
		delay?: number
	}>()

	const raw = props.data || null

	const delay = props.delay || 0
	const heading = raw?.number ? `Договор №${raw.number}` : null
	const about = [
		{ label: 'Тариф',           value: `«${raw?.tariff}»` },
		{ label: 'Номер договора',  value: raw?.id },
		{ label: 'Дата заключения', value: raw?.date },
		{ label: 'Услуга',          value: raw?.service },
	]
	const price = [
		{ label: 'Общая сумма',     value: raw?.price },
		{ label: 'Платеж в месяц',  value: raw?.price ? Math.floor(raw.price / 12) : null },
	]

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