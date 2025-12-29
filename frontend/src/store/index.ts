import {createStore} from 'vuex'
import type {Order, State} from '@/types'

const API_URL = 'http://localhost:3000/api'

const store = createStore<State>({
    state: {
        orders: [],
        products: [],
        selectedOrder: null,
        activeSessions: 0,
        loading: false,
        error: null,
    },

    getters: {
        getAllOrders: state => state.orders,

        getAllProducts: state => {
            return state.orders.flatMap(order =>
                order.products.map(product => ({
                    ...product,
                    orderTitle: order.title,
                }))
            )
        },

        getOrderById: state => (id: number) => {
            return state.orders.find(order => order.id === id)
        },

        getProductsByType: state => (type: string) => {
            const allProducts = state.orders.flatMap(order =>
                order.products.map(product => ({
                    ...product,
                    orderTitle: order.title,
                }))
            )

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

    mutations: {
        SET_LOADING(state, loading: boolean) {
            state.loading = loading
        },

        SET_ERROR(state, error: string | null) {
            state.error = error
        },

        SET_ORDERS(state, orders: Order[]) {
            state.orders = orders
        },

        ADD_ORDER(state, order: Order) {
            state.orders.push(order)
        },

        DELETE_ORDER(state, orderId: number) {
            const orderIndex = state.orders.findIndex(order => order.id === orderId)
            if (orderIndex !== -1) {
                state.orders.splice(orderIndex, 1)

                // Если удаленный заказ был выбран, сбрасываем выбор
                if (state.selectedOrder?.id === orderId) {
                    state.selectedOrder = null
                }
            }
        },

        SELECT_ORDER(state, order: Order | null) {
            state.selectedOrder = order
        },

        SET_ACTIVE_SESSIONS(state, count: number) {
            state.activeSessions = count
        },
    },

    actions: {
        async fetchOrders({commit}) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                const response = await fetch(`${API_URL}/orders`)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const orders = await response.json()

                const normalizedOrders = orders.map((order: Order) => ({
                    ...order,
                    products: order.products.map((product: any) => ({
                        ...product,
                        isNew: Boolean(product.isNew),
                    })),
                }))

                commit('SET_ORDERS', normalizedOrders)
                console.log('✅ Заказы загружены с сервера:', normalizedOrders.length)
            } catch (error) {
                console.error('❌ Ошибка загрузки заказов:', error)
                commit('SET_ERROR', 'Не удалось загрузить заказы')
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async deleteOrder({commit, dispatch}, orderId: number) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                const response = await fetch(`${API_URL}/orders/${orderId}`, {
                    method: 'DELETE',
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                commit('DELETE_ORDER', orderId)
                console.log('✅ Заказ удален:', orderId)
            } catch (error) {
                console.error('❌ Ошибка удаления заказа:', error)
                commit('SET_ERROR', 'Не удалось удалить заказ')
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async createOrder({commit, dispatch}, orderData: Partial<Order>) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                const response = await fetch(`${API_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const newOrder = await response.json()

                await dispatch('fetchOrders')

                console.log('✅ Заказ создан:', newOrder.id)
                return newOrder
            } catch (error) {
                console.error('❌ Ошибка создания заказа:', error)
                commit('SET_ERROR', 'Не удалось создать заказ')
                return null
            } finally {
                commit('SET_LOADING', false)
            }
        },


        selectOrder({commit}, order: Order | null) {
            commit('SELECT_ORDER', order)
        },

        updateActiveSessions({commit}, count: number) {
            commit('SET_ACTIVE_SESSIONS', count)
        },
    },
})

export default store
