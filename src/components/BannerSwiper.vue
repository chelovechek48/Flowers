<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Keyboard } from 'swiper/modules';
import { ref } from 'vue';
import 'swiper/css';

import ImgTemplate from '@components/ImgTemplate.vue';

const modules = [Autoplay, Keyboard];

const images = import.meta.glob('@images/banner/*.*');
const slides = [
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    src: {
      'image/avif': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.avif',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.avif',
      },
      'image/webp': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.webp',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.webp',
      },
      'image/jpeg': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.jpg',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.jpg',
      },
      default: {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.jpg',
      },
    },
    alt: 'букет состоящий из белых цветов',
  },
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    src: {
      'image/avif': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.avif',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.avif',
      },
      'image/webp': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.webp',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.webp',
      },
      'image/jpeg': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.jpg',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.jpg',
      },
      default: {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.jpg',
      },
    },
    alt: 'букет состоящий из белых цветов',
  },
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    src: {
      'image/avif': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.avif',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.avif',
      },
      'image/webp': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.webp',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.webp',
      },
      'image/jpeg': {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.jpg',
        '2x': '/Flowers/src/assets/images/banner/букет-невест@2x.jpg',
      },
      default: {
        '1x': '/Flowers/src/assets/images/banner/букет-невест@1.25x.jpg',
      },
    },
    alt: 'букет состоящий из белых цветов',
  },
];

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
    slides-per-view="auto"
    space-between="12"
    :lazy-preload-prev-next="10"
    :loop="true"

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
      v-for="(slide, index) in slides"
      :key="index"
      @focusin="currentSwiper.keyboard.enable()"
      @focusout="currentSwiper.keyboard.disable()"
      @mouseover="currentSwiper.keyboard.enable()"
      @mouseout="currentSwiper.keyboard.disable()"

      tag="a"
      tabindex="-1"
      class="slide"
      :href="slide.link"
      :aria-label="slide.description + '. Перейти к акции'"
    >
      <ImgTemplate
        class="image-wrapper"
        :slide-images-path="images"
        :slide-src="slide.src"
        :alt="slide.alt"
      />
      <div class="swiper-lazy-preloader" />
    </Swiper-slide>
  </Swiper>
</template>

<style lang="scss" scoped>
@use '@vars/container';

.swiper {
  padding: container.$padding;
  margin: (0 - container.$padding);
  flex-shrink: 0;
  &:focus-within {
    background-color: rgba(blue, 0.05);
  }
}
.slide {
  max-width: min(90%, 20rem);
  height: 100%;
  aspect-ratio: 398/225;
  object-fit: cover;
  border-radius: 1rem;
}
.image-wrapper {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
