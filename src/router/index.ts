import { createRouter, createWebHistory } from 'vue-router'
import VerifiedEmail from '@/views/VerifiiedEmail.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
   
  ]
})

export default router
