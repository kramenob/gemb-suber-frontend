/**
 * 
 * 
 */

import { createRouter, createWebHistory } from 'vue-router'
import { Payment, Invite                } from '@/resources/views'

interface MetaRoute {
  allowed?: boolean
  title?: string
}

/* infra */
const history = createWebHistory(import.meta.env.BASE_URL)
const routes = [
	/* redirect to main company site on root, `meta: allowed` is any other routes return 404 error */
  { path: '/invite',  component: Invite,  meta: { allowed: true, title: 'Приглашение на оплату услуги с рассрочкой | Гемабанк' } },
  { path: '/payment', component: Payment, meta: { allowed: true, title: 'Оплата услуги с рассрочкой | Гемабанк' } },
]

/* provide router */
const router = createRouter({
  history: history,
  routes:  routes,
})

const allowedPaths = new Set(routes.map(r => r.path))
/* derived whitelist slugs from routes */
router.beforeEach((to) => {
  const mainSite = import.meta.env.VITE_MAIN_SITE_URL

  if (!allowedPaths.has(to.path) && mainSite) {
    window.location.href = mainSite
  }
})

router.afterEach((to) => {
  document.title = (to.meta as MetaRoute).title || 'Платёжный шлюз | Гемабанк'
})

export default router
