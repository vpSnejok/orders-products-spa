<script setup lang="ts">
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
  <div class="products-page__filter">
    <label for="product-type-filter" class="products-page__filter-label">
      Тип продукта:
    </label>
    <select
        id="product-type-filter"
        :value="selectedType"
        @change="$emit('updateType', ($event.target as HTMLSelectElement).value)"
        class="products-page__filter-select"
    >
      <option value="all">Все типы</option>
      <option v-for="type in productTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.products-page__filter {
  display: flex;
  align-items: center;
  gap: 12px;
}

.products-page__filter-label {
  font-weight: 500;
  color: #495057;
  margin: 0;
}

.products-page__filter-select {
  padding: 8px 16px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 14px;
  color: #495057;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
}

.products-page__filter-select:hover {
  border-color: #0d6efd;
}

.products-page__filter-select:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
}

@media (max-width: 768px) {
  .products-page__filter {
    flex-direction: column;
    align-items: stretch;
  }

  .products-page__filter-select {
    width: 100%;
  }
}
</style>