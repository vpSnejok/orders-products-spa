<script setup lang="ts">
import ProductCardHeader from "@/components/product/ProductCardHeader.vue";
import ProductCardInfo from "@/components/product/ProductCardInfo.vue";
import ProductCardFooter from "@/components/product/ProductCardFooter.vue";

import type {Product} from '@/types'

interface Props {
  product: Product & { orderTitle: string }
}

defineProps<Props>()
</script>

<template>
  <div class="product-card">
    <ProductCardHeader
        :title="product.title"
        :type="product.type"
        :is-new="product.isNew"
    />

    <div class="product-card__body">
      <ProductCardInfo :product="product"/>
      <ProductCardFooter :product="product"/>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #ffffff;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
}

.product-card:hover {
  border-color: #0d6efd;
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
  transform: translateY(-2px);
}

.product-card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
