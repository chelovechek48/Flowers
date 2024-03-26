<script setup>
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';

import ProductCard from '@components/ProductCard.vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: null,
  },
  direction: {
    type: String,
    required: false,
    default: 'horizontal',
  },
  images: {
    type: Object,
    required: true,
  },
  slideElements: {
    type: Array,
    required: true,
  },
  slideSize: {
    type: Object,
    required: true,
  },
});

let currentSwiper;
const initSwiper = (swiper) => {
  currentSwiper = swiper;
};

const change = (swiper) => {
  const { activeIndex } = swiper;
  const prevSlide = swiper.slides[activeIndex - 1];
  const nextSlide = swiper.slides[activeIndex + 1];

  const prevLink = prevSlide ? prevSlide.querySelector('.card__link') : null;
  const activeLink = swiper.slides[activeIndex].querySelector('.card__link');
  const nextLink = nextSlide ? nextSlide.querySelector('.card__link') : null;

  const swiperHasFocus = (document.activeElement === swiper.el)
    || (document.activeElement === prevLink)
    || (document.activeElement === nextLink);
  if (swiperHasFocus) {
    activeLink.focus();
  }
};

const keyboardEnable = () => {
  currentSwiper.keyboard.enable();
  currentSwiper.autoplay.stop();
};
const keyboardDisable = () => {
  currentSwiper.keyboard.disable();
  currentSwiper.autoplay.start();
};
</script>

<template>
  <Swiper
    class="swiper"
    tabindex="0"
    aria-label="Для прокрутки товаров нажимайте стрелочки влево и вправо на клавиатуре"
    slides-per-view="auto"
    space-between="12"
    :direction="props.direction"
    :loop="true"
    :lazy-preload-prev-next="5"

    @swiper="initSwiper"
    @slideChangeTransitionStart="change"
    @focusin="keyboardEnable"
    @focusout="keyboardDisable"
    @mouseover="keyboardEnable"
    @mouseout="keyboardDisable"

    :modules="[ Autoplay, Keyboard ]"
    :autoplay="{ delay: 2500 }"
    :keyboard="{ enabled: false }"
  >
    <h2
      class="swiper__title"
      v-if="props.title"
    >
      {{ props.title }}
    </h2>
    <Swiper-slide
      v-for="item in images.list"
      :key="item.link"
      :style="`
        width: min(90%, ${props.slideSize.width});
        aspect-ratio: ${props.slideSize.aspectRatio};`"
    >
      <ProductCard
        :item="item"
        :images="images.path"
        :slide-elements="slideElements"
        :is-slide="true"
      />
    </Swiper-slide>
  </Swiper>
</template>

<style lang="scss" scoped>
@use '@vars/container';

.swiper {
  padding: container.$padding;
  margin: (0 - container.$padding);
  &:focus-within {
    background-color: rgba(blue, 0.05);
  }

  display: flex;
  flex-direction: column;

  &__title {
    order: -1;
    font-family: "Arimo", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
}
</style>
