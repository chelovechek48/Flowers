<script setup>
import products from '@/assets/data/products.json';

import ProductCard from '@components/ProductCard.vue';

const imagesProducts = import.meta.glob('@images/products/*.*');
</script>

<template>
  <section class="cart">
    <div
      class="cart__empty"
      v-if="0"
    >
      <img
        class="cart__image"
        src="@icons/cart/cart-is-empty.svg"
        alt="грустный пакетик"
      >
      <h2 class="cart__empty-title">
        Ой, пусто
      </h2>
      <p class="cart__paragraph">
        Ваша корзина пуста, откройте «Каталог» и выберите понравившийся товар
      </p>
    </div>
    <div v-else>
      <ul class="list">
        <li
          class="item"
          v-for="product in products"
          :key="product.id"
        >
          <ProductCard
            :item="product"
            :images="imagesProducts"
            :slide-elements="['image', 'title', 'counter', 'price']"
            :layout-is-grid="false"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.cart {
  font-family: "Arimo", sans-serif;
  padding: 1rem container.$padding;
  min-height: calc(100vh - 4rem);
  min-height: calc(100dvh - 4rem);

  display: flex;
  flex-direction: column;

  &__empty {
    margin-block: auto;
    display: flex; align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 1rem;

    &-title {
      font-size: 1.6rem;
      font-weight: 400;
    }
  }

  &__image {
    width: 5rem;
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

.item {
  display: flex;
  gap: 0.5rem;
}
</style>
