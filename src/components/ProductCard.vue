<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import 'swiper/css';

import ImgTemplate from '@components/ImgTemplate.vue';
import ButtonSVG from '@components/ButtonSVG.vue';
import spritePath from '@icons/navigation-panel/sprite.svg';

import products from '@/assets/data/products.json';

const route = useRoute();

const importPath = (id) => `${spritePath}#${id}`;
const item = products.find((i) => i.id === route.query.id);

const count = ref(1);
const changeCount = (increment) => {
  count.value = Math.max(Number(count.value) + increment, 1);
};
const formattingCount = () => {
  const formattingValue = Number(count.value.replace(/\D/g, ''));
  let validValue;
  if (formattingValue < 1) {
    validValue = 1;
  } else if (formattingValue > 99) {
    validValue = 99;
  } else {
    validValue = formattingValue;
  }
  count.value = validValue;
};

const imagesProducts = import.meta.glob('@images/products/*.*');

const prevPath = window.history.state.back;
const href = prevPath || '/Flowers/home';

</script>

<template>
  <article class="card">
    <div class="container">
      <div class="prev-button__wrapper">
        <ButtonSVG
          class="prev-button"
          :svg-path="importPath('prev')"
          :aria-label="`Перейти назад`"
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
          <div class="card__number-wrapper">
            <button
              class="card__number-button"
              @click="changeCount(-1)"
              :disabled="count <= 1"
            />
            <input
              class="card__number"
              type="text"
              inputmode="numeric"
              v-model="count"
              @change="formattingCount"
            >
            <button
              class="card__number-button card__number-button_increment"
              @click="changeCount(+1)"
              :disabled="count >= 99"
            />
          </div>
          <router-link
            class="card__button"
            :to="href"
          >
            В корзину за&#160;{{ item.price }}&#160;₽
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
    background-color: #f0f0f0;
    padding: 0.5rem container.$padding;
    gap: container.$padding;
  }

  &__number {
    width: 2.5rem;
    font-family: "Arimo", sans-serif;
    font-size: 1.5rem;
    text-align: center;
    background-color: transparent;
    &:focus {
      outline: none;
    }

    &-wrapper {
      display: flex;
      align-items: center;
    }
    &-button {
      width: 2rem;
      aspect-ratio: 1;
      border-radius: 0.5rem;
      background-color: #fff;
      box-shadow: 0 0 2px 0 gray;
      font-size: 1.5rem;

      position: relative;
      &:before,
      &_increment:after {
        content: '';
        position: absolute;
        background-color: #000;
        top: calc(50% - 1px);
        left: 0.375rem;
        width: calc(100% - 0.75rem);
        height: 2px;
      }
      &_increment:after {
        transform: rotate(90deg);
        transform-origin: center;
      }

      &:disabled {
        background-color: transparent;
      }
    }
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
