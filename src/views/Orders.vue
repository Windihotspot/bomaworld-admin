<template>
    <MainLayout>
        <div class="p-6 space-y-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-800">Orders Management</h1>
        <input
          v-model="search"
          type="text"
          placeholder="Search by customer or ID..."
          class="border rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring"
        />
      </div>
  
      <!-- Orders Table -->
      <div class="bg-white shadow-md rounded-xl overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th class="py-3 px-6 text-left">Order ID</th>
              <th class="py-3 px-6 text-left">Customer</th>
              <th class="py-3 px-6 text-left">Total</th>
              <th class="py-3 px-6 text-left">Date</th>
              <th class="py-3 px-6 text-left">Status</th>
              <th class="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-700 divide-y">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
              <td class="py-3 px-6 font-medium">{{ order.id }}</td>
              <td class="py-3 px-6">{{ order.customer }}</td>
              <td class="py-3 px-6">{{ order.total }}</td>
              <td class="py-3 px-6">{{ order.date }}</td>
              <td class="py-3 px-6">
                <span :class="statusBadge(order.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ order.status }}
                </span>
              </td>
              <td class="py-3 px-6 space-x-2">
                <button class="text-blue-600 hover:underline text-xs"><i class="fa fa-eye"></i> View</button>
                <button class="text-yellow-600 hover:underline text-xs"><i class="fa fa-pen"></i> Edit</button>
                <button v-if="order.status !== 'Cancelled'" class="text-red-600 hover:underline text-xs"><i class="fa fa-times-circle"></i> Cancel</button>
                <button v-if="order.status === 'Processing'" class="text-green-600 hover:underline text-xs"><i class="fa fa-check"></i> Deliver</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination (Static) -->
      <div class="flex justify-end pt-4">
        <nav class="inline-flex rounded-md shadow-sm">
          <button class="px-3 py-1 border rounded-l-md bg-gray-100 hover:bg-gray-200">Previous</button>
          <button class="px-3 py-1 border-t border-b bg-white">1</button>
          <button class="px-3 py-1 border-t border-b bg-white">2</button>
          <button class="px-3 py-1 border rounded-r-md bg-gray-100 hover:bg-gray-200">Next</button>
        </nav>
      </div>
    </div>
    </MainLayout>
   
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import MainLayout from '@/layouts/full/MainLayout.vue'
  
  const search = ref('')
  
  const orders = ref([
    { id: 'ORD-1001', customer: 'John Doe', total: '₦120.00', date: '2025-04-29', status: 'Pending' },
    { id: 'ORD-1002', customer: 'Sarah Lee', total: '₦80.50', date: '2025-04-28', status: 'Delivered' },
    { id: 'ORD-1003', customer: 'Mark Ovie', total: '₦43.00', date: '2025-04-27', status: 'Cancelled' },
    { id: 'ORD-1004', customer: 'Chidi Nwosu', total: '₦72.40', date: '2025-04-27', status: 'Processing' },
    { id: 'ORD-1005', customer: 'Anita Joseph', total: '₦150.00', date: '2025-04-26', status: 'Processing' },
  ])
  
  const statusBadge = (status) => {
    return {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    }[status] || 'bg-gray-200 text-gray-800'
  }
  
  const filteredOrders = computed(() =>
    orders.value.filter(
      o =>
        o.customer.toLowerCase().includes(search.value.toLowerCase()) ||
        o.id.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  </script>
  
  <style scoped>
  table th, table td {
    white-space: nowrap;
  }
  </style>
  