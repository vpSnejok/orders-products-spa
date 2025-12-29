<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const priceUsd = computed(() => {
  const price = props.product.price.find(p => p.symbol === 'USD')
  return price?.value || 0
})

const priceUah = computed(() => {
  const price = props.product.price.find(p => p.symbol === 'UAH')
  return price?.value || 0
})
</script>

<template>
  <div class="product-mini-card">
    <div class="product-mini-card__header">
      <h5 class="product-mini-card__title">
        {{ product.title }}
      </h5>
      <span
          v-if="product.isNew"
          class="product-mini-card__badge"
      >
				NEW
			</span>
    </div>
    <p class="product-mini-card__type">{{ product.type }}</p>
    <p class="product-mini-card__spec">
      {{ product.specification }}
    </p>
    <p class="product-mini-card__price">
      ${{ priceUsd }} / {{ priceUah }} UAH
    </p>
  </div>
</template>

<style scoped>
.product-mini-card {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 12px;
}

.product-mini-card__header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 6px;
}

.product-mini-card__title {
  font-size: 15px;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.product-mini-card__badge {
  background: #198754;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
}

.product-mini-card__type {
  color: #0d6efd;
  font-size: 13px;
  margin: 4px 0;
}

.product-mini-card__spec {
  color: #6c757d;
  font-size: 12px;
  margin: 4px 0;
}

.product-mini-card__price {
  color: #198754;
  font-size: 14px;
  font-weight: 600;
  margin: 4px 0 0 0;
}
</style>