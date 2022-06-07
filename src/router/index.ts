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
        name: 'Package List',
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
        name: 'Settings',
        component: () => import('@/views/UserSettings.vue'),
        props: true,
      },
      {
        path: 'add-job',
        name: 'Add Job',
        component: () => import('@/views/AddJob.vue'),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  // linkActiveClass: 'router-link-active',
  routes,
});

export default router;
