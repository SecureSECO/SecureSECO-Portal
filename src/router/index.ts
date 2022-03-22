import { createRouter, createWebHistory } from 'vue-router';
import PackageComponent from '@/components/PackageComponent.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/package/:id',
    name: 'Package',
    component: PackageComponent,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
