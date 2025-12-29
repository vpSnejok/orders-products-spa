<script setup lang="ts">
import ProductMiniCard from "@/components/order/ProductMiniCard.vue";
import type {Order} from '@/types'


interface Props {
  order: Order
}

defineProps<Props>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="order-detail animate__animated animate__fadeInRight">
    <div class="order-detail__header">
      <h3 class="order-detail__title">{{ order.title }}</h3>
      <button class="order-detail__close-btn" @click="$emit('close')">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="order-detail__body">
      <div class="order-detail__section">
        <h4 class="order-detail__section-title">Описание</h4>
        <p class="order-detail__description">
          {{ order.description }}
        </p>
      </div>

      <div class="order-detail__section">
        <h4 class="order-detail__section-title">
          Продукты ({{ order.products.length }})
        </h4>
        <div class="order-detail__products">
          <ProductMiniCard
              v-for="product in order.products"
              :key="product.id"
              :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail {
  background: #ffffff;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 24px;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 220px);
  overflow-y: auto;
}

.order-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e9ecef;
}

.order-detail__title {
  font-size: 22px;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

.order-detail__close-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  font-size: 20px;
  transition: color 0.2s ease;
}

.order-detail__close-btn:hover {
  color: #212529;
}

.order-detail__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-detail__section-title {
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 12px;
}

.order-detail__description {
  color: #6c757d;
  line-height: 1.6;
}

.order-detail__products {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 1024px) {
  .order-detail {
    position: relative;
    top: 0;
    max-height: none;
  }
}
</style>
