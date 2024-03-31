import { createRouter, createWebHistory } from 'vue-router';

import FirstScreenView from '@views/FirstScreenView.vue';
import CatalogView from '@views/CatalogView.vue';
import CartView from '@views/CartView.vue';
import FavoritesView from '@views/FavoritesView.vue';

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
    name: 'cart',
    path: '/Flowers/cart',
    component: CartView,
  },
  {
    name: 'favorites',
    path: '/Flowers/favorites',
    component: FavoritesView,
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
