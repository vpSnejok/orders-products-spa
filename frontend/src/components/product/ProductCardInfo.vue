<script setup lang="ts">
import type { Product } from '@/types'

interface Props {
  product: Product & { orderTitle: string }
}

defineProps<Props>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}
</script>

<template>
  <div class="product-card__info">
    <div class="product-card__info-item">
      <i class="bi bi-inbox"></i>
      <span><strong>Приход:</strong> {{ product.orderTitle }}</span>
    </div>

    <div class="product-card__info-item">
      <i class="bi bi-shield-check"></i>
      <span>
				<strong>Гарантия:</strong><br />
				{{ formatDate(product.guarantee.start) }} -
				{{ formatDate(product.guarantee.end) }}
				<br />
				<small class="text-muted">
					({{ product.guarantee.start }} /
					{{ product.guarantee.end }})
				</small>
			</span>
    </div>

    <div class="product-card__info-item">
      <i class="bi bi-info-circle"></i>
      <span>
				<strong>Спецификация:</strong>
				{{ product.specification }}
			</span>
    </div>

    <div class="product-card__info-item">
      <i class="bi bi-upc"></i>
      <span>
				<strong>Серийный номер:</strong>
				{{ product.serialNumber }}
			</span>
    </div>
  </div>
</template>

<style scoped>
.product-card__info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-card__info-item {
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: #495057;
  line-height: 1.5;
}

.product-card__info-item i {
  font-size: 16px;
  color: #6c757d;
  flex-shrink: 0;
  margin-top: 2px;
}

.product-card__info-item strong {
  color: #212529;
}

.product-card__info-item .text-muted {
  font-size: 11px;
  color: #6c757d;
}
</style>