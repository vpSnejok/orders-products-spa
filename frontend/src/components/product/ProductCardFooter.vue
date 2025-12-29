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
  <div class="product-card__footer">
    <div class="product-card__price">
			<span class="product-card__price-main">
				${{ priceUsd }}
			</span>
      <span class="product-card__price-secondary">
				{{ priceUah }} UAH
			</span>
    </div>
  </div>
</template>

<style scoped>
.product-card__footer {
  padding-top: 12px;
  border-top: 2px solid #e9ecef;
}

.product-card__price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-card__price-main {
  font-size: 24px;
  font-weight: 700;
  color: #198754;
}

.product-card__price-secondary {
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
}
</style>