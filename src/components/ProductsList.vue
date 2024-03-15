<script setup>
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Keyboard } from 'swiper/modules';

import ImgTemplate from '@components/ImgTemplate.vue';

const modules = [Autoplay, Keyboard];

const images = import.meta.glob('@images/products/*.*');

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  items: {
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
  <section class="section">
    <h2 class="section__title">
      {{ props.title }}
    </h2>
    <Swiper
      class="swiper"
      tabindex="0"
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

      :modules="modules"
      :autoplay="{ delay: 2500 }"
      :keyboard="{ enabled: false }"
    >
      <Swiper-slide
        v-for="item in items"
        :key="item.link"

        class="card"
        tag="a"
        :href="item.link"
        :tabindex="-1"
      >
        <ImgTemplate
          class="image-wrapper"
          :slide-images-path="images"
          :slide-src="item.src"
          :alt="item.alt"
        />
        <header class="card__title">
          {{ item.title }}
        </header>
        <div class="card__button">
          от {{ item.price }} ₽
        </div>
      </Swiper-slide>
    </Swiper>
  </section>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.section {
  font-family: "Arimo", sans-serif;
  &__title {
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }
}

.swiper {
  padding: container.$padding;
  margin: (0 - container.$padding);
  &:focus-within {
    background-color: rgba(blue, 0.05);
  }
}

.card {
  max-width: min(90%, 12rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 1rem 1rem 0.5rem 0.5rem;

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
    border-radius: 0.5rem;
  }
}
.image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1rem;
  object-fit: cover;
}
</style>
