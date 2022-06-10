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
        path: 'package/:name',
        name: 'Package',
        component: () => import('@/views/Package.vue'),
        props: true,
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
      {
        path: 'add-job',
        name: 'Add job',
        component: () => import('@/views/AddJob.vue'),
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
