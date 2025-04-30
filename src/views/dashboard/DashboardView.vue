<script setup>
import { ref } from 'vue'
import MainLayout from '@/layouts/full/MainLayout.vue'

import apexchart from 'vue3-apexcharts'

// Sample Data
const orders = ref([
  { id: 'ORD-101', customer: 'John Doe', amount: '₦120.50', status: 'Pending', date: '2025-04-29' },
  {
    id: 'ORD-102',
    customer: 'Jane Smith',
    amount: '₦89.99',
    status: 'Delivered',
    date: '2025-04-28'
  },
  {
    id: 'ORD-103',
    customer: 'Mike Johnson',
    amount: '₦150.00',
    status: 'Cancelled',
    date: '2025-04-27'
  },
  {
    id: 'ORD-104',
    customer: 'Emily Davis',
    amount: '₦67.25',
    status: 'Processing',
    date: '2025-04-26'
  }
])

const salesChartData = ref([
  {
    name: 'Sales',
    data: [4200, 5100, 3900, 6700, 7200, 8300, 9500]
  }
])

const salesChartOptions = ref({
  chart: { toolbar: { show: false } },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  colors: ['#10B981'],
  stroke: { curve: 'smooth' }
})

const inventoryChartData = ref([60, 25, 15]) // In stock, Low, Out
const inventoryChartOptions = ref({
  labels: ['In Stock', 'Low Stock', 'Out of Stock'],
  colors: ['#3B82F6', '#F59E0B', '#EF4444']
})

const statusClass = (status) => {
  return (
    {
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800'
    }[status] || 'bg-gray-100 text-gray-800'
  )
}
</script>

<template>
  <MainLayout>
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Orders -->
      <div class="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4">
        <i class="fa-solid fa-box text-green-600 text-2xl"></i>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Orders</h3>
          <p class="text-xl font-bold text-gray-900">1,245</p>
        </div>
      </div>

      <!-- Total Revenue -->
      <div class="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4">
        <i class="fa-solid fa-sack-dollar text-yellow-600 text-2xl"></i>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p class="text-xl font-bold text-gray-900">₦82,340</p>
        </div>
      </div>

      <!-- Products in Stock -->
      <div class="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4">
        <i class="fa-solid fa-warehouse text-blue-600 text-2xl"></i>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Stocked Products</h3>
          <p class="text-xl font-bold text-gray-900">320</p>
        </div>
      </div>

      <!-- Low Stock Alerts -->
      <div class="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4">
        <i class="fa-solid fa-triangle-exclamation text-red-600 text-2xl"></i>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Low Stock</h3>
          <p class="text-xl font-bold text-gray-900">12 Items</p>
        </div>
      </div>

      <!-- Active Customers -->
      <div class="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4">
        <i class="fa-solid fa-users text-indigo-600 text-2xl"></i>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Customers</h3>
          <p class="text-xl font-bold text-gray-900">523</p>
        </div>
      </div>

      <!-- Pending Orders -->
      <div class="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4">
        <i class="fa-solid fa-hourglass-half text-orange-500 text-2xl"></i>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Pending Orders</h3>
          <p class="text-xl font-bold text-gray-900">34</p>
        </div>
      </div>

      <!-- Delivered Orders -->
      <div class="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4">
        <i class="fa-solid fa-truck text-teal-600 text-2xl"></i>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Delivered Orders</h3>
          <p class="text-xl font-bold text-gray-900">1,110</p>
        </div>
      </div>

      <!-- Wallet Balance -->
      <div class="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4">
        <i class="fa-solid fa-wallet text-purple-600 text-2xl"></i>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Wallet Balance</h3>
          <p class="text-xl font-bold text-gray-900">₦5,670</p>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sales Chart -->
      <div class="bg-white rounded-2xl p-6 shadow-md">
        <h2 class="text-lg font-semibold mb-4">Sales Overview</h2>
        <apexchart type="line" height="300" :options="salesChartOptions" :series="salesChartData" />
      </div>

      <!-- Inventory Pie -->
      <div class="bg-white rounded-2xl p-6 shadow-md">
        <h2 class="text-lg font-semibold mb-4">Inventory Status</h2>
        <apexchart
          type="pie"
          height="300"
          :options="inventoryChartOptions"
          :series="inventoryChartData"
        />
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="bg-white rounded-2xl p-6 shadow-md">
      <h2 class="text-lg font-semibold mb-4">Recent Orders</h2>
      <table class="min-w-full text-sm text-left">
        <thead class="text-gray-600 border-b">
          <tr>
            <th class="py-2">Order ID</th>
            <th class="py-2">Customer</th>
            <th class="py-2">Amount</th>
            <th class="py-2">Status</th>
            <th class="py-2">Date</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="(order, index) in orders" :key="index" class="border-b hover:bg-gray-50">
            <td class="py-2">{{ order.id }}</td>
            <td class="py-2">{{ order.customer }}</td>
            <td class="py-2">{{ order.amount }}</td>
            <td class="py-2">
              <span
                :class="statusClass(order.status)"
                class="px-2 py-1 rounded text-xs font-medium"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="py-2">{{ order.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </MainLayout>
</template>

<style scoped>
.h-8 {
  height: 2rem;
}
.custom-btn {
  background-color: #1f5aa3;
  text-transform: none;
}
v-btn {
  text-transform: none;
}
</style>
