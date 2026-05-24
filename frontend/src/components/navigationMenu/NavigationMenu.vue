<template>
	<nav class="navigation-menu">
		<div class="container">
			<ul class="navigation-menu__list">
				<li class="navigation-menu__item">
					<router-link
						to="/orders"
						class="navigation-menu__link"
						active-class="navigation-menu__link--active"
					>
						<i class="bi bi-inbox"></i>
						<span>Приходы</span>
					</router-link>
				</li>

				<li class="navigation-menu__item">
					<router-link
						to="/products"
						class="navigation-menu__link"
						active-class="navigation-menu__link--active"
					>
						<i class="bi bi-grid"></i>
						<span>Продукты</span>
					</router-link>
				</li>

				<!-- Кнопка reset data -->
				<li class="navigation-menu__item">
					<button
						class="navigation-menu__link navigation-menu__button"
						:disabled="loading"
						@click="resetData"
					>
						<i class="bi bi-arrow-clockwise"></i>
						<span>Reset Data</span>
					</button>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrdersStore } from '@/store'

const store = useOrdersStore()

const loading = computed(() => store.isLoading)

const resetData = async () => {
	await store.resetData()
}
</script>

<style scoped>
.navigation-menu {
	background: #0d6efd;
	color: #ffffff;
}

.navigation-menu__list {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
	gap: 4px;
}

.navigation-menu__item {
	flex: 0 0 auto;
}

.navigation-menu__link {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 14px 24px;
	color: #ffffff;
	text-decoration: none;
	font-weight: 500;
	transition: all 0.2s ease;
	position: relative;
	border: none;
	background: transparent;
	cursor: pointer;
	font: inherit;
}

.navigation-menu__link:hover {
	background: rgba(255, 255, 255, 0.1);
}

.navigation-menu__link--active {
	background: #ffffff;
	color: #0d6efd;
}

.navigation-menu__link i {
	font-size: 18px;
}

.navigation-menu__button {
	height: 100%;
}

.navigation-menu__button:disabled {
	opacity: 0.65;
	cursor: wait;
}

@media (max-width: 768px) {
	.navigation-menu__link {
		padding: 12px 16px;
		font-size: 14px;
	}

	.navigation-menu__link span {
		display: none;
	}
}
</style>
