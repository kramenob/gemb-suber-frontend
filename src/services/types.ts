/**
 * API interface types
 */

export interface PaymentResponse {
	id: string
	formUrl: string
	status: 'pending' | 'success' | 'fail'
}

export interface PaidContractsResponse {
	data: string[] // список contract_id
}

/* Data state's interfaces */

export interface Client {
	firstname:   string
	middlename?: string
	lastname:    string
	fullname:    string
	appeal:      string
	email?:      string
	phone?:      string
}

export interface Service {
	id:   string
	name: string
	cost: number
}

export interface Tariff {
	code:     string
	name:     string
	services: Service[]
}

export interface Contract {
	id:       string,
	number:   string,
	tariff:   string,
	date:     string,
	service:  string,
	price:    number,
	paid?:    boolean
}

export interface ContractItem {
	id:           string
	date:         string,
	service:      string
	serviceData?: Service
	paid?:        boolean
}