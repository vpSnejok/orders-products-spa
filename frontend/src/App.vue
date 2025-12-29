<script setup lang="ts">
import {io, type Socket} from 'socket.io-client'
import {computed, onBeforeUnmount, onMounted} from 'vue'
import {useStore} from 'vuex'
import TopMenu from "@/components/topMenu/TopMenu.vue";
import NavigationMenu from "@/components/navigationMenu/NavigationMenu.vue";


const store = useStore()
let socket: Socket | null = null
let pingInterval: number | undefined

const loading = computed(() => store.getters.isLoading)
const error = computed(() => store.getters.getError)

const retryLoad = () => {
  store.dispatch('fetchOrders')
}

onMounted(() => {
  store.dispatch('fetchOrders')

  const socketUrl = 'http://localhost:3000'

  console.log('🔌 Подключение к WebSocket:', socketUrl)

  socket = io(socketUrl, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  })

  socket.on('connect', () => {
    console.log('✅ Подключено к WebSocket серверу')
  })

  socket.on('activeSessions', (count: number) => {
    console.log('📊 Активных сессий:', count)
    store.dispatch('updateActiveSessions', count)
  })

  socket.on('disconnect', () => {
    console.log('❌ Отключено от WebSocket сервера')
  })

  socket.on('connect_error', err => {
    console.error('❌ Ошибка подключения WebSocket:', err)
  })

  pingInterval = window.setInterval(() => {
    if (socket && socket.connected) {
      socket.emit('ping')
    }
  }, 30000)
})

onBeforeUnmount(() => {
  if (pingInterval) {
    clearInterval(pingInterval)
  }
  if (socket) {
    socket.disconnect()
  }
})
</script>

<template>
  <div id="app" class="app">
    <TopMenu/>
    <NavigationMenu/>

    <main class="app__content">
      <div v-if="loading" class="app__loading">
        <div class="spinner"></div>
        <p>Загрузка данных...</p>
      </div>

      <div v-else-if="error" class="app__error">
        <i class="bi bi-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button @click="retryLoad" class="btn btn-primary">
          Попробовать снова
        </button>
      </div>

      <router-view v-else v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
  Arial, sans-serif;
  background-color: #f8f9fa;
  color: #212529;
}

#app {
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__content {
  flex: 1;
  padding: 20px;
}

.app__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e9ecef;
  border-top-color: #0d6efd;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.app__loading p {
  font-size: 18px;
  color: #6c757d;
}

.app__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
  text-align: center;
  padding: 20px;
}

.app__error i {
  font-size: 64px;
  color: #dc3545;
}

.app__error p {
  font-size: 18px;
  color: #6c757d;
  max-width: 500px;
}

.app__error .btn {
  padding: 10px 24px;
  font-size: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease,
  transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: #0d6efd;
  color: #ffffff;
}

.btn-primary:hover {
  background: #0b5ed7;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 768px) {
  .app__content {
    padding: 15px;
  }

  .container {
    padding: 0 10px;
  }
}
</style>
