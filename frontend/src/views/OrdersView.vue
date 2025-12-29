<script setup lang="ts">
import {computed, ref} from 'vue'
import OrdersList from "@/components/order/OrdersList.vue";
import OrderDetail from "@/components/order/OrderDetail.vue";
import DeleteModal from "@/components/order/DeleteModal.vue";
import type {Order} from '@/types'

import {useStore} from 'vuex'

const store = useStore()
const orderToDelete = ref<number | null>(null)

const orders = computed(() => store.getters.getAllOrders)
const selectedOrder = computed(() => store.getters.getSelectedOrder)

const selectOrder = (order: Order) => {
  store.dispatch('selectOrder', order)
}

const deselectOrder = () => {
  store.dispatch('selectOrder', null)
}

const showDeleteModal = (orderId: number) => {
  orderToDelete.value = orderId
}

const cancelDelete = () => {
  orderToDelete.value = null
}

const confirmDelete = () => {
  if (orderToDelete.value !== null) {
    store.dispatch('deleteOrder', orderToDelete.value)
    orderToDelete.value = null
  }
}
</script>

<template>
  <div class="orders-page">
    <div class="container">
      <h2 class="orders-page__title animate__animated animate__fadeInDown">
        Приходы
      </h2>

      <div class="orders-page__content">
        <OrdersList
            :orders="orders"
            :selected-order-id="selectedOrder?.id"
            @select-order="selectOrder"
            @delete-order="showDeleteModal"
        />

        <transition name="slide-in">
          <OrderDetail
              v-if="selectedOrder"
              :order="selectedOrder"
              @close="deselectOrder"
          />
        </transition>
      </div>
    </div>

    <DeleteModal
        v-if="orderToDelete !== null"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.orders-page {
  padding: 20px 0;
}

.orders-page__title {
  font-size: 28px;
  font-weight: 700;
  color: #212529;
  margin-bottom: 24px;
}

.orders-page__content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s ease;
}

.slide-in-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-in-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 1024px) {
  .orders-page__content {
    grid-template-columns: 1fr;
  }
}
</style>
