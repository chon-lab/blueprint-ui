import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/app/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/features/dashboard/pages/DashboardPage.vue'),
        },
        {
          path: 'acoes',
          name: 'actions',
          component: () => import('@/features/actions/pages/ActionsPage.vue'),
        },
        {
          path: 'agentes',
          name: 'agents',
          component: () => import('@/features/agents/pages/AgentsPage.vue'),
        },
        {
          path: 'ods',
          name: 'sdgs',
          component: () => import('@/features/sdgs/pages/SdgsPage.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' },
    },
  ],
})

export default router
