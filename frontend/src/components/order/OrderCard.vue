<script setup lang="ts">
import OrderCardInfo from "@/components/order/OrderCardInfo.vue";
import type {Order} from '@/types'


interface Props {
  order: Order
  isSelected: boolean
}

const props = defineProps<Props>()

defineEmits<{
  select: []
  delete: []
}>()

const calculateTotal = () => {
  const usd = props.order.products.reduce((sum, product) => {
    const price = product.price.find(p => p.symbol === 'USD')
    return sum + (price?.value || 0)
  }, 0)

  const uah = props.order.products.reduce((sum, product) => {
    const price = product.price.find(p => p.symbol === 'UAH')
    return sum + (price?.value || 0)
  }, 0)

  return {usd, uah}
}
</script>

<template>
  <div
      class="order-card animate__animated animate__fadeInUp"
      :class="{ 'order-card--selected': isSelected }"
      @click="$emit('select')"
  >
    <div class="order-card__header">
      <h3 class="order-card__title">{{ order.title }}</h3>
      <button
          class="order-card__delete-btn"
          @click.stop="$emit('delete')"
          title="Удалить приход"
      >
        <i class="bi bi-trash"></i>
      </button>
    </div>

    <OrderCardInfo
        :products-count="order.products.length"
        :date="order.date"
        :total-usd="calculateTotal().usd"
        :total-uah="calculateTotal().uah"
    />
  </div>
</template>

<style scoped>
.order-card {
  background: #ffffff;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.order-card:hover {
  border-color: #0d6efd;
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
}

.order-card--selected {
  border-color: #0d6efd;
  background: #f8f9ff;
}

.order-card__header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
}

.order-card__title {
  font-size: 20px;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

.order-card__delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 18px;
  transition: all 0.2s ease;
}

.order-card__delete-btn:hover {
  color: #bb2d3b;
  transform: scale(1.1);
}
</style>
