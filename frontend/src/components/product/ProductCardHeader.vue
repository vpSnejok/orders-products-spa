<script setup lang="ts">
interface Props {
  title: string
  type: string
  isNew?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="product-card__header">
    <div>
      <h3 class="product-card__title">{{ title }}</h3>
      <p class="product-card__type">{{ type }}</p>
    </div>
    <span v-if="isNew" class="product-card__badge">NEW</span>
  </div>
</template>

<style scoped>
.product-card__header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e9ecef;
}

.product-card__title {
  font-size: 18px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 4px 0;
}

.product-card__type {
  font-size: 14px;
  color: #0d6efd;
  font-weight: 500;
  margin: 0;
}

.product-card__badge {
  background: #198754;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>