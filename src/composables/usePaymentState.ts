// frontend/src/composables/usePaymentState.ts
import Cookies from 'js-cookie'
import type { Client, ContractItem } from '@/services/types'

const COOKIE_NAME = 'payment_state'

export function usePaymentState() {

  function saveState(client: Client, contracts: ContractItem[]) {
    const data = {
      client,
      contracts,
      timestamp: Date.now()
    }
    // cookie живет 12 часов
    Cookies.set(COOKIE_NAME, JSON.stringify(data), { expires: 0.5 }) // 0.5 дня = 12 часов
  }

  function loadState(): { client: Client | null, contracts: ContractItem[] } {
    const raw = Cookies.get(COOKIE_NAME)
    if (!raw) return { client: null, contracts: [] }
    try {
      const data = JSON.parse(raw)
      return {
        client: data.client ?? null,
        contracts: data.contracts ?? []
      }
    } catch {
      return { client: null, contracts: [] }
    }
  }

  function clearState() {
    Cookies.remove(COOKIE_NAME)
  }

  return { saveState, loadState, clearState }
}