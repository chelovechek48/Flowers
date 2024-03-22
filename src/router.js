import { createRouter, createWebHistory } from 'vue-router';

import FirstScreenView from '@views/FirstScreenView.vue';
import CatalogView from '@views/CatalogView.vue';
import ProductInfoView from '@views/ProductInfoView.vue';

const routes = [
  {
    name: 'home',
    path: '/Flowers/home',
    component: FirstScreenView,
  },
  {
    name: 'catalog',
    path: '/Flowers/catalog',
    component: CatalogView,
  },
  {
    name: 'card',
    path: '/Flowers/card',
    component: ProductInfoView,
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/Flowers/home',
  },
];

export default createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
});
