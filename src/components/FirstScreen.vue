<script setup>
import { ref } from 'vue';
import BannerSwiper from '@components/BannerSwiper.vue';
import ProductsList from '@components/ProductsList.vue';

import products from '@/assets/data/products.json';
</script>

<template>
  <main
    class="first-screen"
    tabindex="-1"
  >
    <!-- <BannerSwiper /> -->
    <ProductsList
      title="Популярные товары"
      direction="horizontal"
      :items="products"
    />
    <!-- <ProductsList
      title="Букеты со скидкой"
      direction="horizontal"
      :items="products"
    /> -->
  </main>
</template>

<style lang="scss" scoped>
@use '@vars/container';

.first-screen {
  flex: 1 1 0;
  overflow-y: auto;
  padding: container.$padding;

  display: flex;
  flex-direction: column;
  gap: 3rem;
}
</style>
