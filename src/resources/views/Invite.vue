<template>
  <div>

    <h1>Здравствуйте{{ client ? `, ${client}` : '' }}</h1>
    <p>Вы перешли по персональной ссылке для оплаты услуг.</p>
    <button @click="goToPayment">Перейти к оплате</button>

  </div>
</template>

<script setup lang="ts">

	import { ref, onMounted } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const client = ref<string>('')

	onMounted(() => {
		const params = new URLSearchParams(window.location.search)
		const clientRaw = params.get('client') || ''
		const [lastname = '', firstname = '', middlename = ''] = clientRaw.split('_')

		const contractsRaw = params.get('contracts') || ''
		const contracts = contractsRaw
			.split(',')
			.map(item => {
				const [number, service] = item.split(':')
				return { number: number?.trim(), service: service?.trim() }
			})
			.filter(c => c.number && c.service)

		const data = { firstname, middlename, lastname, contracts, tariffCode: params.get('tariff') || '' }
		client.value = [firstname, middlename].filter(Boolean).join(' ')
		sessionStorage.setItem('state', JSON.stringify(data))
	})

	function goToPayment() {
		router.push('/payment')
	}

</script>