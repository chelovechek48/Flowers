<script setup>
import { ref, onBeforeUpdate, onUnmounted } from 'vue';
import products from '@/assets/data/products.json';
import ProductCard from '@components/ProductCard.vue';

const imagesProducts = import.meta.glob('@images/products/*.*');

const getProductsFilter = () => {
  const dataObject = JSON.parse(localStorage.getItem('cart-storage')) || {};
  return products
    .filter((prod) => dataObject[prod.id] >= 0)
    .map((prod) => (
      { ...prod, count: dataObject[prod.id] }
    ));
};

const productsFilter = ref(getProductsFilter());

onBeforeUpdate(() => {
  const storage = JSON.parse(localStorage.getItem('cart-storage')) || {};
  productsFilter.value = products
    .filter((prod) => storage[prod.id] >= 0)
    .map((prod) => (
      { ...prod, count: storage[prod.id] }
    ));
});

onUnmounted(() => {
  const cartStorageWithoutNull = JSON.parse(localStorage.getItem('cart-storage')) || {};
  Object.keys(cartStorageWithoutNull).forEach((key) => {
    if (cartStorageWithoutNull[key] === 0) {
      delete cartStorageWithoutNull[key];
    }
  });
  localStorage.setItem('cart-storage', JSON.stringify(cartStorageWithoutNull));
});

</script>

<template>
  <section
    class="cart cart_not-empty"
    v-if="productsFilter.length"
  >
    <ul class="list">
      <li
        v-for="product in productsFilter"
        :key="product.id"
      >
        <ProductCard
          :item="product"
          :images="imagesProducts"
          :slide-elements="['image', 'title', 'price', 'favorites', 'counter']"
          :layout-is-grid="false"
          :is-cart="true"
          @countChanged="productsFilter = getProductsFilter()"
        />
      </li>
    </ul>
    <button
      class="button"
      aria-label="Оформить заказ"
    >
      Заказать за {{
        productsFilter.map((prod) => prod.price * prod.count).reduce((a, b) => a + b)
      }} ₽
    </button>
  </section>
  <section
    class="cart cart_empty"
    v-else
  >
    <img
      class="cart__image"
      src="@icons/empty/cart-is-empty.svg"
      alt="грустный пакетик"
    >
    <h2 class="cart__title">
      Ой, пусто
    </h2>
    <p class="cart__paragraph">
      Ваша корзина пуста, откройте «Каталог» и выберите понравившийся товар
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

.cart {
  font-family: "Arimo", sans-serif;
  padding: 1rem container.$padding 0 container.$padding;
  @media (min-width: calc(breakpoints.$mobile-small + 1px)) {
    min-height: calc(100vh - 3.75rem);
    min-height: calc(100dvh - 3.75rem);
  }
  @media (max-width: breakpoints.$mobile-small) {
    min-height: calc(100vh - 2.5rem);
    min-height: calc(100dvh - 2.5rem);
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &_not-empty {
    justify-content: space-between;
  }
  &_empty {
    align-items: center; justify-content: center;
    text-align: center;
    gap: 1rem;

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

.list {
  display: flex;
  flex-direction: column;
  gap: (container.$padding * 1.5) container.$padding;
}

.link {
  font-size: 1.25rem;
  text-align: center;
  color: #fff;
  background-color: colors.$pink;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
}

.button {
  z-index: 20;
  position: sticky;
  margin-inline: -0.75rem;
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
</style>
