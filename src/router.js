import { createRouter, createWebHistory } from 'vue-router';

import FirstScreen from '@components/FirstScreen.vue';
import ProductCard from '@components/ProductCard.vue';

const routes = [
  {
    path: '/Flowers/card',
    component: ProductCard,
  },
  {
    path: '/Flowers/home',
    component: FirstScreen,
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
