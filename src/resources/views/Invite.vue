<template>

	<div :class="cn([
		'flex flex-col items-center',
		'w-full max-h-[75vh]', 'overflow-hidden',
		'pt-8 pb-16',
	])">
		<Container>

			<div :class="cn([
				'flex flex-col space-y-6',
			])">
				<!-- Title -->
				<div :class="cn([
					'',
				])">
					<h1>{{ APP_TITLE }}</h1>
				</div>
				<!-- Skeletons -->
				<div :class="cn([
					'flex flex-col space-y-8',
				])">
					<!-- Welcoming text -->
					<div :class="cn([ 'flex flex-col space-y-2', ])">
						<figure
							v-for="i in 3"
							:key="i"
							:class="cn([
								'skeleton skeleton-text-base',
								i === 1 && 'w-6/10',
								i === 2 && 'w-8/10',
								i === 3 && 'w-4/10',
							])"
						></figure>
					</div>
					<div :class="cn([ 'flex flex-col space-y-6', ])">
						<!-- How it works title -->
						<div :class="cn([ 'flex flex-row justify-center', 'w-full', ])">
							<figure
								:class="cn([
									'skeleton skeleton-text-h1',
									'w-2/10',
								])"
							></figure>
						</div>
						<!-- How it works title -->
						<div :class="cn([ 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4', ])">
							<div
								v-for="i in 3"
								:key="i"
								:class="cn([ 'flex flex-col space-y-6', 'w-full', ])"
							>
								<figure
									:class="cn([
										'skeleton',
										'w-full h-75',
									])"
								></figure>
								<Divider :class="cn([ 'bg-gray-light', ])" />
								<div :class="cn([ 'flex flex-col space-y-2', 'px-6', ])">
									<figure
										v-for="i in 3"
										:key="i"
										:class="cn([
											'skeleton skeleton-text-base',
											i === 1 && 'w-6/10',
											i === 2 && 'w-8/10',
											i === 3 && 'w-4/10',
										])"
									></figure>
								</div>
							</div>
						</div>
					</div>
					<Divider :class="cn([ 'bg-gray-light', ])" />
					<div :class="cn([ 'flex flex-col space-y-6', ])">
						<!-- Contracts' title -->
						<div :class="cn([ 'flex flex-row justify-center', 'w-full', ])">
							<figure
								:class="cn([
									'skeleton skeleton-text-h1',
									'w-2/10',
								])"
							></figure>
						</div>
						<!-- Contracts' description -->
						<div :class="cn([ 'flex flex-col space-y-2', ])">
							<figure
								v-for="i in 3"
								:key="i"
								:class="cn([
									'skeleton skeleton-text-base',
									i === 1 && 'w-9/10',
									i === 2 && 'w-7/10',
									i === 3 && 'w-3/10',
								])"
							></figure>
						</div>
						<!-- Contracts' cards -->
						<div :class="cn([ 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4', ])">
							<div
								v-for="i in 3"
								:key="i"
								:class="cn([ 'flex flex-col space-y-6', 'w-full', ])"
							>
								<figure
									:class="cn([
										'skeleton',
										'w-full h-75',
									])"
								></figure>
								<Divider :class="cn([ 'bg-gray-light', ])" />
								<div :class="cn([ 'flex flex-col space-y-2', 'px-6', ])">
									<figure
										v-for="i in 3"
										:key="i"
										:class="cn([
											'skeleton skeleton-text-base',
											i === 1 && 'w-6/10',
											i === 2 && 'w-8/10',
											i === 3 && 'w-4/10',
										])"
									></figure>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</Container>
	</div>

	<!-- Modal -->
	<Modal opened closeless>
		<div :class="cn([ 'flex flex-col space-y-6', ])">
			<div :class="cn([ 'flex flex-col space-y-2', ])">
				<div :class="cn([ 'flex flex-col', ])">
					<span :class="cn([ 'text-2xl font-semibold', ])">Здравствуйте,</span>
					<span :class="cn([ 'text-2xl font-semibold', ])">{{ client?.appeal }}!</span>
				</div>
				<div :class="cn([ 'w-full max-w-[calc(var(--px)*480)]', ])">
					<span>Вы находитесь на платёжном сервисе оплаты услуг с рассрочкой. Для перехода к информации о Ваших услугах и договорах нажмите кнопку ниже.</span>
				</div>
			</div>
			<Button
				title="Перейти к оплате"
				@click="goToPayment"
			>Перейти к оплате</Button>
		</div>
	</Modal>

</template>

<script setup lang="ts">

	import { ref, onMounted } from 'vue'
	import { useRouter      } from 'vue-router'

	import { useClient } from '@/composables'
	import type { Client    } from '@/services/types'

	import { Container, Divider, Button } from '@/resources/components/ui'
	import { Modal                      } from '@/resources/components/shared'

	import { cn } from '@/utils'

	const APP_TITLE = import.meta.env.VITE_APP_TITLE

	/* define client */
	const client = ref<Client | null>(null)

	const router = useRouter()

	onMounted(() => {
		const params    = new URLSearchParams(window.location.search)
		const clientRaw = decodeURIComponent(params.get('client') || '')
		const [lastname = '', firstname = '', middlename = ''] = clientRaw.split('_')

		client.value = {
			firstname,
			middlename,
			lastname,
			fullname: [lastname, firstname, middlename].filter(Boolean).join(' '),
			appeal: [firstname, middlename].filter(Boolean).join(' ')
		}

		const contractsRaw = params.get('contracts') || ''
		const contracts = contractsRaw
			.split(',')
			.map(item => {
				const [
					id,
					date,
					service
				] = item.split(':')
				return {
					id:      id?.trim(),
					date:    date?.trim(),
					service: service?.trim()
				}
			})
			.filter(c => c.id && c.date && c.service)

		const data = {
			client,
			contracts,
			tariff: {
				code: params.get('tariff') || ''
			}
		}

		sessionStorage.setItem('state', JSON.stringify(data))

		const { setClient } = useClient()
		setClient(client.value)
	})

	function goToPayment() {
		router.push('/payment')
	}

</script>