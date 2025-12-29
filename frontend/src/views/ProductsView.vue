<script setup lang="ts">
import {computed, ref} from 'vue'
import {useStore} from 'vuex'

import type {Product} from '@/types'
import ProductsHeader from "@/components/product/ProductsHeader.vue";
import ProductsGrid from "@/components/product/ProductsGrid.vue";
import ProductsEmpty from "@/components/product/ProductsEmpty.vue";

const store = useStore()
const selectedType = ref('all')

const allProducts = computed(() => store.getters.getAllProducts)

const productTypes = computed(() => {
  const types = new Set<string>(
      allProducts.value.map((p: Product & { orderTitle: string }) => p.type)
  )
  return Array.from(types)
})

const filteredProducts = computed(() => {
  return store.getters.getProductsByType(selectedType.value)
})
</script>

<template>
  <div class="products-page">
    <div class="container">
      <ProductsHeader
          :product-types="productTypes"
          :selected-type="selectedType"
          @update-type="selectedType = $event"
      />

      <ProductsGrid
          v-if="filteredProducts.length > 0"
          :products="filteredProducts"
      />

      <ProductsEmpty v-else/>
    </div>
  </div>
</template>

<style scoped>
.products-page {
  padding: 20px 0;
}
</style>