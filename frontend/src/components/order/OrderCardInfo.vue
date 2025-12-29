<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  productsCount: number
  date: string
  totalUsd: number
  totalUah: number
}

const props = defineProps<Props>()

const formattedDate = computed(() => {
  const date = new Date(props.date)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
})
</script>

<template>
	<div class="order-card__info">
		<div class="order-card__info-item">
			<i class="bi bi-box-seam"></i>
			<span>{{ productsCount }} продуктов</span>
		</div>

		<div class="order-card__info-item">
			<i class="bi bi-calendar"></i>
			<span>{{ formattedDate }} / {{ date }}</span>
		</div>

		<div class="order-card__info-item">
			<i class="bi bi-cash"></i>
			<span class="order-card__price">
				${{ totalUsd }} / {{ totalUah }} UAH
			</span>
		</div>
	</div>
</template>

<style scoped>
.order-card__info {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.order-card__info-item {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #6c757d;
	font-size: 14px;
}

.order-card__info-item i {
	font-size: 16px;
}

.order-card__price {
	font-weight: 600;
	color: #198754;
}
</style>
