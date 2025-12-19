import { ref } from 'vue'


import type { Client } from '@/services/types'

const client = ref<Client | null>(null)

export function useClient() {

	function loadClient() {
		const raw = sessionStorage.getItem('state')
		if (!raw) return

		try {
			const data = JSON.parse(raw)
			client.value = data.client || null
		} catch (e) {
			console.error('Failed to load client from sessionStorage', e)
		}
	}

	function setClient(value: Client) {
		client.value = value

		const raw = sessionStorage.getItem('state')
		const data = raw ? JSON.parse(raw) : {}
		data.client = value
		sessionStorage.setItem('state', JSON.stringify(data))
	}

	function clear() {
		client.value = null
		const raw = sessionStorage.getItem('state')
		if (!raw) return
		try {
			const data = JSON.parse(raw)
			delete data.client
			sessionStorage.setItem('state', JSON.stringify(data))
		} catch {}
	}

	return {
		client,
		loadClient,
		setClient,
		clear
	}
}