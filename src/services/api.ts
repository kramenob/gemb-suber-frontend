// Function to fetch client data from backend

// frontend/src/services/api.ts
import { APP_URL } from '@/config'
import type { TariffData, ClientData, PaymentResponse, PaidContractsResponse } from './types'

// получение тарифов
export async function fetchTariff(code: string): Promise<TariffData | null> {
  try {
    const res = await fetch(`${APP_URL}/api/v1/tariff?code=${encodeURIComponent(code)}`)
    if (!res.ok) throw new Error(`Tariff fetch failed: ${res.status}`)
    const json = await res.json()
    return json.data as TariffData
  } catch (e) {
    console.error(e)
    return null
  }
}

// создание транзакции для оплаты
export async function createPayment(contract: string, client: ClientData, amount: number): Promise<PaymentResponse | null> {
  try {
    const res = await fetch(`${APP_URL}/api/v1/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contract, client, amount })
    })
    if (!res.ok) throw new Error(`Payment request failed: ${res.status}`)
    return await res.json() as PaymentResponse
  } catch (e) {
    console.error(e)
    return null
  }
}

// получение уже оплаченных договоров
export async function fetchPaidContracts(): Promise<string[]> {
  try {
    const res = await fetch(`${APP_URL}/api/v1/paid`)
    if (!res.ok) throw new Error(`Paid contracts fetch failed: ${res.status}`)
    const json = await res.json() as PaidContractsResponse
    return json.data
  } catch (e) {
    console.error(e)
    return []
  }
}