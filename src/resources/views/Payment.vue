<template>
  <div>
    <h1>Оплата услуг</h1>

    <div v-if="contractsList.length">
			<template
        v-for="(c, index) in contractsList"
        :key="index"
      >
				<div v-if="c.serviceData?.name && c.serviceData?.cost">
					<h2>Договор: {{  c.contract                              }}</h2>
					<p>Услуга: {{    c.serviceData?.name || c.service || '~' }}</p>
					<p>Стоимость: {{ c.serviceData?.cost              ?? '~' }}</p>

					<button
						:class="cn([ 'disabled:opacity-50', ])"
						:disabled="c.paid"
						@click="openPayModal(c)"
					>
						Перейти к оплате
					</button>
				</div>
			</template>

			<Modal
				v-if="showPayModal"
				@close="showPayModal = false"
				:class="cn([ 'z-max',
					'fixed top-0 left-0',
					'w-full h-full',
					'bg-black/40',
				])"
			>
				<div
					:class="cn([
						'absolute top-1/2 left-1/2 transform -translate-1/2',
						'w-100 h-50',
						'bg-white',
					])"
				>
					<button @click="showPayModal = false">
						Закрыть
					</button>
					<h3>Оплата договора {{ activeContract?.contract }}</h3>

					<input
						v-model="payForm.email"
						type="email"
						placeholder="Email"
					/>

					<input
						v-model="payForm.phone"
						type="tel"
						placeholder="Телефон"
					/>

					<button @click="submitPayment">
						Оплатить
					</button>
				</div>
			</Modal>
    </div>

    <div v-else>
      Нет данных для оплаты.
    </div>
  </div>

</template>

<script setup lang="ts">

	import { ref, onMounted, reactive } from 'vue'
	import { fetchTariff, createPayment, fetchPaidContracts } from '@/services/api'
	import type { ContractItem, ClientData } from '@/services/types'
	import { cn } from '@/utils'

	const contractsList = ref<ContractItem[]>([])
	const tariffCode = ref<string | null>(null)
	let clientData: ClientData = { firstname: '', middlename: '', lastname: '', email: '', phone: '' }

	onMounted(async () => {
		loadFromSession()
		await loadTariff()
		await loadPaidContracts()
	})

	function loadFromSession() {
		const raw = sessionStorage.getItem('state')
		if (!raw) return
		try {
			const data = JSON.parse(raw)
			if (Array.isArray(data.contracts)) {
				contractsList.value = data.contracts.map((c: any) => ({
					contract: c.number,
					service: c.service,
					paid: c.paid || false
				}))
			}
			if (typeof data.tariffCode === 'string' && data.tariffCode.trim() !== '') {
				tariffCode.value = data.tariffCode
			}
			clientData = { firstname: data.firstname, middlename: data.middlename, lastname: data.lastname }
		} catch (e) {
			console.error('Failed to parse session data', e)
		}
	}

	async function loadTariff() {
		if (!tariffCode.value) return
		const tariff = await fetchTariff(tariffCode.value)
		if (!tariff) return
		const map: Record<string, any> = {}
		tariff.services.forEach(s => (map[s.id] = s))
		contractsList.value.forEach(c => {
			if (map[c.service]) c.serviceData = map[c.service]
		})
	}

	async function loadPaidContracts() {
		const paid = await fetchPaidContracts()
		contractsList.value.forEach(c => { if (paid.includes(c.contract)) c.paid = true })
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

		clientData.email = payForm.email
		clientData.phone = payForm.phone.replace(/\D+/g, '')

		try {
			const res = await createPayment(
				c.contract,
				clientData,
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
			number: c.contract,
			service: c.service,
			paid: c.paid
		}))
		sessionStorage.setItem('state', JSON.stringify(data))
	}

</script>