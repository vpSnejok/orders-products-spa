import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/orders',
	},
	{
		path: '/orders',
		name: 'orders',
		component: () => import('../views/OrdersView.vue'),
		meta: {
			title: 'Приходы',
		},
	},
	{
		path: '/products',
		name: 'products',
		component: () => import('../views/ProductsView.vue'),
		meta: {
			title: 'Продукты',
		},
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})


router.beforeEach((to, from, next) => {
	const title = to.meta.title as string
	document.title = `${title || 'Orders & Products'} - SPA`
	next()
})

export default router
