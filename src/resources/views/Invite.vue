<template>
  <div>
    <h1>Client Info</h1>
    <div v-if="client">
      <p><strong>ID:</strong> {{ client.id }}</p>
      <p><strong>Name:</strong> {{ client.name }}</p>
      <p><strong>Email:</strong> {{ client.email }}</p>
      <p><strong>Status:</strong> {{ client.status }}</p>
    </div>
    <div v-else>
      Loading client data...
    </div>
    <button @click="loadClient">Reload Client</button>
  </div>
</template>

<script setup lang="ts">

	import      { ref         } from 'vue'
	import      { fetchClient } from '@/services/api'
	import type { Client      } from '@/services/types'

	const client = ref<Client | null>(null)

	async function loadClient() {
		try {
			client.value = await fetchClient()
		} catch (e) {
			console.error(e)
			client.value = { error: 'Failed to load client data' }
		}
	}

	// Load client on component mount
	loadClient()

</script>