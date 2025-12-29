<script setup lang="ts">
import OrderCard from "@/components/order/OrderCard.vue";
import type { Order } from '@/types'


interface Props {
  orders: Order[]
  selectedOrderId?: number
}

defineProps<Props>()

defineEmits<{
  selectOrder: [order: Order]
  deleteOrder: [orderId: number]
}>()
</script>

<template>
	<div class="orders-page__list">
		<OrderCard
			v-for="order in orders"
			:key="order.id"
			:order="order"
			:is-selected="selectedOrderId === order.id"
			@select="$emit('selectOrder', order)"
			@delete="$emit('deleteOrder', order.id)"
		/>
	</div>
</template>

<style scoped>
.orders-page__list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>
