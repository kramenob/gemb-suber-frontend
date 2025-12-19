<template>

	<div :class="cn([
		'flex flex-col items-center',
		'w-full', 'overflow-hidden',
		'pt-8 pb-16',
	])">
		<Container>

			<div :class="cn([
				'flex flex-col space-y-6',
			])">
				<!-- title -->
				<div :class="cn([
					'',
				])">
					<h1>{{ APP_TITLE }}</h1>
				</div>
				<!-- introduction -->
				<div :class="cn([
					'flex flex-col space-y-2',
					'w-full max-w-[calc(var(--px)*900)]',
				])">
					<p><strong>{{ client?.appeal }}</strong>, Вы находитесь на платежном сервисе Гемабанка.</p>
					<p>Пожалуйста, ознакомьтесь с информацией ниже и перейдите к оплате. Оплата услуг по тарифу «{{ _tariff?.name }}» ({{ _tariff?.code }}) осуществляется <strong>ежемесячно, отдельно по каждому договору</strong>.</p>
				</div>

				<Divider />

				<!-- how it works -->
				<HowItWorks />

				<Divider />

				<!-- contract -->
				<Contracts :data="contracts" />

				<Divider />

				<!-- questions -->
				<Questions />
			</div>

		</Container>
	</div>

	<!-- Modal -->
	<Modal>

		<!-- pay confirmation -->
		<div :class="cn([ 'flex flex-col space-y-6', ])">
			<div :class="cn([ 'flex flex-col space-y-2', ])">
				<div :class="cn([ 'flex flex-col', ])">
					<span :class="cn([ 'text-2xl font-semibold', ])">Оплата услуги по договору</span>
					<span :class="cn([ 'text-2xl font-semibold', ])">{{ docTitle }}</span>
				</div>
				<div :class="cn([ 'w-full max-w-[calc(var(--px)*480)]', ])">
					<span>Укажите адрес электронной почты, на которую будут поступать чеки и напоминания об оплате, а также номер телефона для связи, в случае необходимости.</span>
				</div>
				<div :class="cn([ 'flex flex-col space-y-2', ])">
					<div :class="cn([ 'flex flex-col space-y-2', ])">
						<Input v-model="payForm.email" type="email" name="email" placeholder="E-mail" />
						<Input v-model="payForm.phone" type="tel"   name="phone" placeholder="Номер телефона" />
					</div>
					<div :class="cn([ 'flex flex-col space-y-2', ])">
						<Checkbox name="keep-credentials" />
						<Checkbox checkless />
					</div>
				</div>
			</div>
			<Button
				title="Оплатить"
				@click="submitPayment"
			>Оплатить</Button>
		</div>

	</Modal>

</template>

<script setup lang="ts">

	import { ref, onMounted, reactive } from 'vue'

	import      { fetchTariff, createPayment, fetchPaidContracts } from '@/services/api'
	import type { ContractItem, Contract, Client, Service, Tariff } from '@/services/types'

	import { useClient } from '@/composables'

	import { Container, Checkbox, Input, Button, Divider } from '@/resources/components/ui'
	import { Modal                                       } from '@/resources/components/shared'
	import { HowItWorks, Contracts, Questions            } from '@/resources/components/sections'

	import { cn } from '@/utils'

	const APP_TITLE = import.meta.env.VITE_APP_TITLE

	const { client, loadClient } = useClient()

	const contractsList = ref<ContractItem[]>([])
	const contracts = ref<Contract[]>([])
	const _client = ref<Client | null>(null)
	const _tariff = ref<Tariff | null>(null)

	onMounted(async () => {
		loadClient()
		loadFromSession()
		await loadTariff()
		buildContractsForView()
		await loadPaidContracts()
	})

	function loadFromSession() {
		const raw = sessionStorage.getItem('state')
		if (!raw) return

		const data = JSON.parse(raw)

		if (data.tariff?.code) {
			_tariff.value = {
				code: data.tariff.code,
				name: '',
				services: []
			}
		}

		if (Array.isArray(data.contracts)) {
			contractsList.value = data.contracts.map((c: any) => ({
				id:      c.id,
				date:    c.date,
				service: c.service,
				paid: Boolean(c.paid)
			}))
		}

		if (data.client) {
			_client.value = data.client
		}
	}

	async function loadTariff() {
		if (!_tariff?.value?.code) return
		const tariff = await fetchTariff(_tariff?.value?.code)
		if (!tariff) return
		_tariff.value = {
			...tariff,
			code: _tariff.value.code
		}
		const map: Record<string, Service> = {}
		tariff.services.forEach((s: Service) => (map[s.id] = s))
		contractsList.value.forEach(c => {
			if (map[c.service]) c.serviceData = map[c.service]
		})
	}

	function buildContractsForView() {
		contracts.value = contractsList.value.map((c, index) => ({
			id:     c.id,
			number: c.id?.replace(/\D/g, ''),
			tariff: _tariff.value?.name || '—',
			date: c.date || new Date().toLocaleDateString('ru-RU'),
			service: c.serviceData?.name || c.service || '—',
			price: c.serviceData?.cost || 0
		}))
	}

	async function loadPaidContracts() {
		const paid = await fetchPaidContracts()
		contractsList.value.forEach(c => { if (paid.includes(c.id)) c.paid = true })
	}

	const showPayModal = ref(false)
	const activeContract = ref<ContractItem | null>(null)

	const payForm = reactive({
		email: '',
		phone: ''
	})

	function openPayModal(contract: ContractItem) {
		activeContract.value = contract
		payForm.email = ''
		payForm.phone = ''
		showPayModal.value = true
	}

	function openPopupWithPost(url: string, data: any) {
		const popup = window.open('', 'PaymentPopup', 'width=500,height=700,left=100,top=100,resizable=yes,scrollbars=yes')
		if (!popup) return

		const form = popup.document.createElement('form')
		form.method = 'POST'
		form.action = url

		for (const key in data) {
			const input = popup.document.createElement('input')
			input.type = 'hidden'
			input.name = key
			input.value = typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key])
			form.appendChild(input)
		}

		popup.document.body.appendChild(form)
		form.submit()
	}

async function submitPayment() {
	if (!activeContract.value) return
	const c = activeContract.value

	if (!payForm.email) {
		alert('Email обязателен')
		return
	}

	// Compose a client object for payment, using the loaded client and form fields
	const paymentClient: Client = {
		...(_client.value ?? {
			firstname: '',
			middlename: '',
			lastname: '',
			fullname: '',
			appeal: ''
		}),
		email: payForm.email,
		phone: payForm.phone.replace(/\D+/g, '')
	}

	try {
		const res = await createPayment(
			c.id,
			paymentClient,
			c.serviceData!.cost
		)

		if (!res?.formUrl) {
			console.error('Payment API error', res)
			return
		}
		if (res?.formUrl) {
			const width = 500
			const height = 700
			const left = window.screenX + (window.innerWidth - width) / 2
			const top = window.screenY + (window.innerHeight - height) / 2

			window.open(
				res.formUrl,
				'PaymentPopup',
				`width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
			)

			c.paid = true
			saveProgress()
			showPayModal.value = false
		} else {
			console.error('Payment API error', res)
		}
	} catch (e) {
		console.error('Payment failed', e)
	}
}

	function saveProgress() {
		const raw = sessionStorage.getItem('state')
		const data = raw ? JSON.parse(raw) : {}
		data.contracts = contractsList.value.map(c => ({
			number: c.id,
			service: c.service,
			paid: c.paid
		}))
		sessionStorage.setItem('state', JSON.stringify(data))
	}

</script>