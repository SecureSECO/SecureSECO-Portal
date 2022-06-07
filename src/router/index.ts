import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'Home' },
  },
  {
    name: 'app',
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'packages',
        name: 'View Packages list',
        component: () => import('@/views/Packages.vue'),
        props: true,
      },
      {
        path: 'package/:id',
        name: 'Package',
        component: () => import('@/views/Package.vue'),
        props: (route) => ({ id: Number(route.params.id) ?? 0 }),
      },
      {
        path: 'metrics',
        name: 'Metrics',
        component: () => import('@/views/Metrics.vue'),
      },
      {
        path: 'user/settings',
        name: 'User Settings',
        component: () => import('@/views/UserSettings.vue'),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
