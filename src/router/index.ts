import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Package from '../views/Package.vue';
import AddPackage from '../views/AddPackage.vue';
import DltStatus from '../views/DltStatus.vue';
import SpiderPackage from '../views/SpiderPackage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/package/:id',
    name: 'Package',
    component: Package,
    props: true,
  },
  {
    path: '/add-package',
    name: 'Add Package',
    component: AddPackage,
    props: true,
  },
  {
    path: '/dlt',
    name: 'Dlt Status',
    component: DltStatus,
    props: true,
  },
  {
    path: '/spider-package',
    name: 'Spider package',
    component: SpiderPackage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
