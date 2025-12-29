<script setup lang="ts">
import ProductTypeFilter from "@/components/product/ProductTypeFilter.vue";

interface Props {
  productTypes: string[]
  selectedType: string
}

defineProps<Props>()

defineEmits<{
  updateType: [type: string]
}>()
</script>

<template>
  <div class="products-page__header">
    <h2 class="products-page__title">Продукты</h2>

    <ProductTypeFilter
        :product-types="productTypes"
        :selected-type="selectedType"
        @update-type="$emit('updateType', $event)"
    />
  </div>
</template>

<style scoped>
.products-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.products-page__title {
  font-size: 28px;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

@media (max-width: 768px) {
  .products-page__header {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>