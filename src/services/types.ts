/**
 * API interface types
 */

export interface Service {
  id: string
  name: string
  cost: number
}

export interface TariffData {
  id: string
  name: string
  services: Service[]
}

export interface ContractItem {
  contract: string        // id договора для фронта
  service: string         // код услуги
  serviceData?: Service   // опционально, данные услуги после fetch
  paid?: boolean          // флаг оплаты
}

export interface Contract {
  id: string
  items: ContractItem[]
  totalCost: number
}

export interface ClientData {
  firstname: string
  middlename?: string
  lastname: string
  email?: string
  phone?: string
}

export interface PaymentResponse {
  id: string
  formUrl: string
  status: 'pending' | 'success' | 'fail'
}

export interface PaidContractsResponse {
  data: string[] // список contract_id
}