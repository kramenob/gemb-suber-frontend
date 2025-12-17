/**
 * 
 * 
 */

import { createRouter, createWebHistory } from 'vue-router'

import { Home, Invite } from '@/resources/views'

const routes = [
  { path: '/',       component: Home   },
  { path: '/invite', component: Invite },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
