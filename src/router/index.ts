/**
 * 
 * 
 */

import { createRouter, createWebHistory } from 'vue-router'
import { Payment, Invite                } from '@/resources/views'

/* infra */
const history = createWebHistory(import.meta.env.BASE_URL)
const routes = [
	/* redirect to main company site on root, `meta: allowed` is any other routes return 404 error */
  { path: '/invite',  component: Invite,  meta: { allowed: true } },
  { path: '/payment', component: Payment, meta: { allowed: true } },
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

  // если путь не найден и основной сайт задан — редиректим
  if (!allowedPaths.has(to.path) && mainSite) {
    window.location.href = mainSite
  }
  // иначе оставляем пользователя на текущем пути
})

export default router
