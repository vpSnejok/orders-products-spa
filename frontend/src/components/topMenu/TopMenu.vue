<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const currentTime = ref(new Date())
let timer: number | undefined

const activeSessions = computed(() => store.getters.getActiveSessions || 1)

const formattedDateTime = computed(() => {
  const date = currentTime.value
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
})

const sessionsWord = computed(() => {
  const count = activeSessions.value
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'активных сессий'
  }

  if (lastDigit === 1) {
    return 'активная сессия'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'активные сессии'
  }

  return 'активных сессий'
})

onMounted(() => {
  timer = window.setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
	<div class="top-menu">
		<div class="container">
			<div class="top-menu__content">

				<div class="top-menu__brand">
					<i class="bi bi-box-seam"></i>
					<h1 class="top-menu__title">Orders & Products</h1>
				</div>

				<div class="top-menu__info">
					<div class="top-menu__time">
						<i class="bi bi-clock"></i>
						<span>{{ formattedDateTime }}</span>
					</div>

					<div class="top-menu__sessions">
						<span class="top-menu__sessions-dot"></span>
						<span class="top-menu__sessions-text">
							{{ activeSessions }} {{ sessionsWord }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.top-menu {
	background: #ffffff;
	border-bottom: 1px solid #dee2e6;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	padding: 12px 0;
}

.top-menu__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.top-menu__brand {
	display: flex;
	align-items: center;
	gap: 12px;
}

.top-menu__brand i {
	font-size: 24px;
	color: #0d6efd;
}

.top-menu__title {
	font-size: 20px;
	font-weight: 700;
	color: #212529;
	margin: 0;
}

.top-menu__info {
	display: flex;
	align-items: center;
	gap: 24px;
}

.top-menu__time {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #6c757d;
	font-size: 14px;
	font-family: 'Courier New', monospace;
}

.top-menu__time i {
	font-size: 16px;
}

.top-menu__sessions {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 16px;
	background: #d1e7dd;
	color: #0f5132;
	border-radius: 20px;
	font-size: 14px;
	font-weight: 600;
}

.top-menu__sessions-dot {
	width: 8px;
	height: 8px;
	background: #198754;
	border-radius: 50%;
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

@media (max-width: 768px) {
	.top-menu__content {
		flex-direction: column;
		gap: 12px;
	}

	.top-menu__title {
		font-size: 18px;
	}

	.top-menu__info {
		gap: 12px;
	}

	.top-menu__time {
		font-size: 12px;
	}

	.top-menu__sessions {
		font-size: 12px;
		padding: 4px 12px;
	}
}
</style>
