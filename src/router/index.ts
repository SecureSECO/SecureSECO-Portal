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
        props: true,
      },
      {
        path: 'add-package',
        name: 'Add Package',
        component: () => import('@/views/AddPackage.vue'),
        props: true,
      },
      {
        path: 'dlt',
        name: 'Dlt Status',
        component: () => import('@/views/DltStatus.vue'),
        props: true,
      },
      {
        path: 'spider-package',
        name: 'Spider package',
        component: () => import('@/views/SpiderPackage.vue'),
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
