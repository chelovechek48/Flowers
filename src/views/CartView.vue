<script setup>
import { ref } from 'vue';
import products from '@/assets/data/products.json';

import ProductCard from '@components/ProductCard.vue';

const imagesProducts = import.meta.glob('@images/products/*.*');

const cartStorage = JSON.parse(localStorage.getItem('cart-storage')) || {};

const productFilter = ref(
  products
    .filter((prod) => cartStorage[prod.id])
    .map((prod) => (
      { ...prod, count: cartStorage[prod.id] }
    )),
);

const getPrice = (vars) => {
  const f = productFilter.value.find((prod) => prod.id === vars.id);
  f.count = vars.count;
};
</script>

<template>
  <section
    class="cart cart_not-empty"
    v-if="productFilter.length"
  >
    <ul class="list">
      <li
        v-for="product in productFilter"
        :key="product.id"
      >
        <ProductCard
          :item="product"
          :images="imagesProducts"
          :slide-elements="['image', 'title', 'counter', 'price']"
          :layout-is-grid="false"
          :is-cart="true"
          @countChanged="getPrice($event)"
        />
      </li>
    </ul>
    <button class="button">
      Заказать за {{
        productFilter.map((prod) => {
          return prod.price * prod.count
        }).reduce((a, b) => a + b)
      }} ₽
    </button>
  </section>
  <section
    class="cart cart_empty"
    v-else
  >
    <img
      class="cart__image"
      src="@icons/cart/cart-is-empty.svg"
      alt="грустный пакетик"
    >
    <h2 class="cart__title">
      Ой, пусто
    </h2>
    <p class="cart__paragraph">
      Ваша корзина пуста, откройте «Каталог» и выберите понравившийся товар
    </p>
  </section>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.cart {
  font-family: "Arimo", sans-serif;
  padding: 1rem container.$padding 0 container.$padding;
  min-height: calc(100vh - 3.75rem);
  min-height: calc(100dvh - 3.75rem);

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
    width: 5rem;
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

.button {
  z-index: 20;
  position: sticky;
  bottom: 3.75rem;
  margin-inline: -0.75rem;

  font-family: "Arimo", sans-serif;
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  background-color: colors.$pink;
  padding: 0.75rem;
}
</style>
