export interface ProductPrice {
	value: number
	symbol: 'USD' | 'UAH'
	isDefault: boolean
}

export interface ProductGuarantee {
	start: string
	end: string
}

export interface Product {
	id: number
	serialNumber: number
	isNew: boolean
	photo: string
	title: string
	type: string
	specification: string
	guarantee: ProductGuarantee
	price: ProductPrice[]
	order: number
	date: string
}
