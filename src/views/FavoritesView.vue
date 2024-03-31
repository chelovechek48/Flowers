<script setup>
import products from '@/assets/data/products.json';

import CatalogView from '@views/CatalogView.vue';

const favoritesStorage = JSON.parse(localStorage.getItem('favorites-storage')) || [];

const productFilter = products
  .filter((prod) => favoritesStorage.indexOf(prod.id) + 1)
  .map((prod) => (
    { ...prod, count: favoritesStorage[prod.id] }
  ));

const addToCart = () => {
  const cartStorage = JSON.parse(localStorage.getItem('cart-storage')) || [];
  for (let i = 0; i < productFilter.length; i += 1) {
    if (!cartStorage[productFilter[i].id]) {
      cartStorage[productFilter[i].id] = 1;
    }
  }
  localStorage.setItem('cart-storage', JSON.stringify(cartStorage));
};

</script>

<template>
  <section
    v-if="productFilter.length"
    class="favorites"
  >
    <CatalogView :products="productFilter" />
    <button
      class="button"
      aria-label="Добавить в Корзину"
      @click="addToCart()"
    >
      Добавить в Корзину
    </button>
  </section>
  <section
    class="favorites favorites_empty"
    v-else
  >
    <img
      class="favorites__image"
      src="@icons/empty/favorites-is-empty.svg"
      alt="грустный пакетик"
    >
    <h2 class="favorites__title">
      Список пуст
    </h2>
    <p class="favorites__paragraph">
      Когда найдете товар, который вам понравился, сохраните его нажав на сердечко
    </p>
    <router-link
      class="link"
      to="catalog"
      aria-label="Перейти в каталог"
    >
      Перейти в Каталог
    </router-link>
  </section>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints';
@use '@vars/container';
@use '@vars/colors';

.favorites {
  font-family: "Arimo", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: calc(breakpoints.$mobile-small + 1px)) {
    min-height: calc(100vh - 3.75rem);
    min-height: calc(100dvh - 3.75rem);
  }
  @media (max-width: breakpoints.$mobile-small) {
    min-height: calc(100vh - 2.5rem);
    min-height: calc(100dvh - 2.5rem);
  }

  &_empty {
    align-items: center; justify-content: center;
    text-align: center;
    gap: 1rem;
    padding: 1rem container.$padding 0 container.$padding;

  }
  &__image {
    height: 5rem;
  }
  &__title {
    font-size: 1.6rem;
    font-weight: 400;
  }

  &__paragraph {
    color: colors.$dark-gray;
    font-size: 1rem;
    line-height: 1.2;
  }
}

.button {
  z-index: 20;
  position: sticky;
  @media (min-width: calc(breakpoints.$mobile-small + 1px)) {
    bottom: 3.75rem;
  }
  @media (max-width: breakpoints.$mobile-small) {
    bottom: 2.5rem;
  }

  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  background-color: colors.$pink;
  padding: 0.75rem;
}

.link {
  font-size: 1.25rem;
  text-align: center;
  color: #fff;
  background-color: colors.$pink;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
}
</style>
