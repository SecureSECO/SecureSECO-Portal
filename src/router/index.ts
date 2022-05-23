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
        path: 'user/profile',
        name: 'User Profile',
        component: () => import('@/views/UserProfile.vue'),
        props: true,
      },
      {
        path: 'package/:id',
        name: 'Package',
        component: () => import('@/views/Package.vue'),
        props: true,
      },
      {
        path: 'user/login',
        name: 'Log in',
        component: () => import('@/views/Login.vue'),
        props: true,
      },
      {
        path: 'user/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
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
