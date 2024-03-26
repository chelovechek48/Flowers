<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import 'swiper/css';

import ImgTemplate from '@components/ImgTemplate.vue';
import ButtonSVG from '@components/ButtonSVG.vue';
import ProductCounter from '@components/ProductCounter.vue';

import products from '@/assets/data/products.json';

const route = useRoute();

const item = products.find((i) => i.id === route.query.id);
const imagesProducts = import.meta.glob('@images/products/*.*');

const prevPath = window.history.state.back;
const href = prevPath || '/Flowers/home';

const count = ref(1);
const updateCount = (value) => {
  count.value = value;
};

</script>

<template>
  <article class="card">
    <div class="container">
      <div class="prev-button__wrapper">
        <ButtonSVG
          class="prev-button"
          aria-label="Перейти назад"
          :svg-id="'prev'"
          :link="href"
        />
      </div>
      <ImgTemplate
        class="image-wrapper"
        :slide-images-path="imagesProducts"
        :slide-src="item['src-fullscreen']"
        alt="alt"
      />
      <div class="card__text">
        <h2 class="card__title">
          {{ item.title }}
        </h2>
        <p class="card__description">
          {{ item.description }}
        </p>
      </div>
      <div class="card__to-cart-wrapper">
        <div class="card__to-cart">
          <ProductCounter @countChanged="updateCount($event)" />
          <router-link
            class="card__button"
            aria-label="добавить в корзину"
            :to="href"
          >
            В корзину за&#160;{{ item.price * count }}&#160;₽
          </router-link>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.container {
  max-width: container.$width;
  min-height: 100vh;
  min-height: 100dvh;
  margin-inline: auto;

  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.prev-button {
  &__wrapper {
    position: sticky;
    top: 0;
    height: 0;
  }
  transform: translate(1.5rem, 1.5rem);
  background-color: rgba(#fff, 0.85);
  border-radius: 25%;
}

.card {
  font-family: "Arimo", sans-serif;
  &__text {
    padding: container.$padding;
    display: flex;
    flex-direction: column;
    gap: container.$padding;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 400;
  }
  &__description {
    color: colors.$dark-gray;
    font-size: 1.25rem;
  }

  &__to-cart {
    &-wrapper {
      position: sticky;
      bottom: 0;
      width: 100%;
      flex: 1 1 0;
      display: flex;
      align-items: flex-end;
    }
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: colors.$light-gray;
    padding: 0.5rem container.$padding;
    gap: container.$padding;
  }

  &__button {
    width: 100%;
    font-family: "Arimo", sans-serif;
    font-size: 1.25rem;
    text-align: center;
    color: #fff;
    background-color: colors.$pink;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
  }
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 1;
}
</style>
