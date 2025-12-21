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
				<Skeleton />
			</div>

		</Container>
	</div>

	<!-- Modal -->
	<Modal opened closeless>
		<!-- welcome -->
		<div v-if="!showErrorModal" :class="cn([ 'flex flex-col space-y-6', ])">
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
		<!-- error -->
		<div v-if="showErrorModal" :class="cn([ 'flex flex-col space-y-8', ])">
			<div :class="cn([ 'flex flex-col space-y-4', ])">
				<div :class="cn([ 'flex flex-col', ])">
					<span :class="cn([ 'text-2xl font-semibold', ])">Упс! Что-то пошло не так...</span>
				</div>
				<div :class="cn([ 'w-full max-w-[calc(var(--px)*480)]', ])">
					<span>Похоже, Вы попали сюда случайно или ссылка сломана.</span>
				</div>
			</div>
			<Button
				title="Вернуться на главную"
				@click="goToHome"
			>Вернуться на главную</Button>
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
	import { Skeleton                   } from '@/resources/components/sections'

	import { cn } from '@/utils'

	const APP_TITLE = import.meta.env.VITE_APP_TITLE
	const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL

	/* define client */
	const client = ref<Client | null>(null)

	const showErrorModal = ref(false)

	const router = useRouter()

	onMounted(() => {
		const params    = new URLSearchParams(window.location.search)

		const requiredParams = ['client', 'contracts', 'tariff']
		const missingParams = requiredParams.filter(p => !params.has(p) || !params.get(p))

		if (missingParams.length > 0) {
			showErrorModal.value = true
			return
		}

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

	function goToHome() {
		window.location.replace(MAIN_SITE_URL)
	}

</script>