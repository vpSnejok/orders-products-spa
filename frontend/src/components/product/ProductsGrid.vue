<script setup lang="ts">
import ProductCard from "@/components/product/ProductCard.vue";
import type {Product} from '@/types'

interface Props {
  products: (Product & { orderTitle: string })[]
}

defineProps<Props>()
</script>

<template>
  <div class="products-page__grid">
    <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
    />
  </div>
</template>

<style scoped>
.products-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .products-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>