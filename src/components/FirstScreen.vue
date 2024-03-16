<script setup>
import ProductsList from '@components/ProductsList.vue';

import banners from '@/assets/data/banners.json';
import products from '@/assets/data/products.json';

const imagesBanners = import.meta.glob('@images/banner/*.*');
const imagesProducts = import.meta.glob('@images/products/*.*');
</script>

<template>
  <main
    class="first-screen"
    tabindex="-1"
  >
    <ProductsList
      :images="{ path: imagesBanners, list: banners }"
      :slide-elements="[ 'image' ]"
      :slide-size="{ width: '20rem', aspectRatio: '398/225' }"
    />
    <ProductsList
      title="Популярные товары"
      :images="{ path: imagesProducts, list: products }"
      :slide-elements="[ 'image', 'title', 'price']"
      :slide-size="{ width: '12rem', aspectRatio: '1' }"
    />
    <ProductsList
      title="Букеты со скидкой"
      :items="products"
      :images="{ path: imagesProducts, list: products }"
      :slide-elements="[ 'image', 'title', 'price']"
      :slide-size="{ width: '12rem', aspectRatio: '1' }"
    />
  </main>
</template>

<style lang="scss" scoped>
@use '@vars/container';

.first-screen {
  padding: container.$padding;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
