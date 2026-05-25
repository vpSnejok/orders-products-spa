import { defineStore } from 'pinia'
import type { Order, Product, State } from '@/types'

const API_URL =
	import.meta.env.VITE_API_URL || 'http://orders.snejok.syudo.org.ua:13005/api'

type ProductWithOrderTitle = Product & { orderTitle: string }

const normalizeOrders = (orders: Order[]): Order[] =>
	orders.map(order => ({
		...order,
		products: order.products.map(product => ({
			...product,
			isNew: Boolean(product.isNew),
		})),
	}))

export const useOrdersStore = defineStore('orders', {
	state: (): State => ({
		orders: [],
		products: [],
		selectedOrder: null,
		activeSessions: 0,
		loading: false,
		error: null,
	}),

	getters: {
		getAllOrders: state => state.orders,

		getAllProducts: state =>
			state.orders.flatMap(order =>
				order.products.map(product => ({
					...product,
					orderTitle: order.title,
				}))
			) as ProductWithOrderTitle[],

		getProductsByType: state => (type: string) => {
			const allProducts = state.orders.flatMap(order =>
				order.products.map(product => ({
					...product,
					orderTitle: order.title,
				}))
			) as ProductWithOrderTitle[]

			if (type === 'all') {
				return allProducts
			}

			return allProducts.filter(product => product.type === type)
		},

		getSelectedOrder: state => state.selectedOrder,

		getActiveSessions: state => state.activeSessions,

		isLoading: state => state.loading,

		getError: state => state.error,
	},

	actions: {
		async fetchOrders() {
			this.loading = true
			this.error = null

			try {
				const response = await fetch(`${API_URL}/orders`)

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const orders = (await response.json()) as Order[]
				const normalizedOrders = normalizeOrders(orders)

				this.orders = normalizedOrders
				console.log('✅ Заказы загружены с сервера:', normalizedOrders.length)
			} catch (error) {
				console.error('❌ Ошибка загрузки заказов:', error)
				this.error = 'Не удалось загрузить заказы'
			} finally {
				this.loading = false
			}
		},

		async deleteOrder(orderId: number) {
			this.loading = true
			this.error = null

			try {
				const response = await fetch(`${API_URL}/orders/${orderId}`, {
					method: 'DELETE',
				})

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const orderIndex = this.orders.findIndex(order => order.id === orderId)
				if (orderIndex !== -1) {
					this.orders.splice(orderIndex, 1)

					if (this.selectedOrder?.id === orderId) {
						this.selectedOrder = null
					}
				}

				console.log('✅ Заказ удален:', orderId)
			} catch (error) {
				console.error('❌ Ошибка удаления заказа:', error)
				this.error = 'Не удалось удалить заказ'
			} finally {
				this.loading = false
			}
		},

		async resetData() {
			this.loading = true
			this.error = null

			try {
				const response = await fetch(`${API_URL}/reset`, {
					method: 'POST',
				})

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const data = (await response.json()) as { orders: Order[] }
				const normalizedOrders = normalizeOrders(data.orders)

				this.orders = normalizedOrders
				this.selectedOrder = null
				console.log('✅ Данные восстановлены:', normalizedOrders.length)
			} catch (error) {
				console.error('❌ Ошибка восстановления данных:', error)
				this.error = 'Не удалось восстановить данные'
			} finally {
				this.loading = false
			}
		},

		selectOrder(order: Order | null) {
			this.selectedOrder = order
		},

		updateActiveSessions(count: number) {
			this.activeSessions = count
		},
	},
})

export default useOrdersStore
