<script setup>
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';

import ImgTemplate from '@components/ImgTemplate.vue';

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
  const activeSlide = swiper.slides[activeIndex];
  const prevSlide = swiper.slides[activeIndex - 1];
  const nextSlide = swiper.slides[activeIndex + 1];
  const swiperHasFocus = (document.activeElement === swiper.el)
    || (document.activeElement === prevSlide)
    || (document.activeElement === nextSlide);
  if (swiperHasFocus) {
    activeSlide.focus();
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

      class="slide"
      tag="a"
      :style="`
        width: min(90%, ${props.slideSize.width});
        aspect-ratio: min(90%, ${props.slideSize.aspectRatio});`"
      :href="item.link"
      :aria-label="item.description"
      :tabindex="-1"
    >
      <ImgTemplate
        class="image-wrapper"
        :slide-images-path="props.images.path"
        :slide-src="item.src"
        :alt="item.alt"
        v-if="props.slideElements.includes('image')"
      />
      <header
        class="slide__title"
        v-if="props.slideElements.includes('title')"
      >
        {{ item.title }}
      </header>
      <div
        class="slide__button"
        v-if="props.slideElements.includes('price')"
      >
        от {{ item.price }} ₽
      </div>
    </Swiper-slide>
  </Swiper>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.swiper {
  font-family: "Arimo", sans-serif;

  padding: container.$padding;
  margin: (0 - container.$padding);
  &:focus-within {
    background-color: rgba(blue, 0.05);
  }

  display: flex;
  flex-direction: column;

  &__title {
    order: -1;
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 1rem;
}
}

.slide {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 1rem;

  &:focus-visible {
    outline-offset: 0.25rem;
    outline-style: auto;
  }

  &__title {
    font-size: 1.25rem;
    margin-block: 0.75rem;
  }
  &__button {
    font-size: 1.25rem;
    color: colors.$pink;
    padding: 0.5rem 1rem;
    box-shadow: 0 0 0 1px colors.$pink;
    border-radius: 0.5rem 1rem;
  }
}
.image-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
}
</style>
