export interface Price {
	value: number
	symbol: 'USD' | 'UAH'
	isDefault: 0 | 1
}

export interface Guarantee {
	start: string
	end: string
}

export interface Product {
	id: number
	serialNumber: number
	isNew: boolean
	photo: string
	title: string
	type: ProductType
	specification: string
	guarantee: Guarantee
	price: Price[]
	order: number
	date: string
}

export type ProductType = 'Monitors' | 'Tablets' | 'Smartphones'

export interface Order {
	id: number
	title: string
	date: string
	description: string
	products: Product[]
}

export interface State {
	orders: Order[]
	products: Product[]
	selectedOrder: Order | null
	activeSessions: number
	loading: boolean
	error: string | null
}