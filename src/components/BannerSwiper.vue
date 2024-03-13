<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import { ref } from 'vue';
import 'swiper/css';

import SrcToPicture from '@components/SrcToPicture.vue';

const modules = [Autoplay];

const images = import.meta.glob('@images/banner/*.*');
const slides = [
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    src: {
      'image/avif': {
        '1x': ref('/Flowers/src/assets/images/banner/букет-невест@1.25x.avif'),
        '2x': 'https://w.forfun.com/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg',
      },
      'image/webp': {
        '1x': ref('@images/banner/букет-невест@1.25x.webp'),
        '2x': ref('@images/banner/букет-невест@2x.webp'),
      },
      'image/jpeg': {
        '1x': ref('@images/banner/букет-невест@1.25x.jpg'),
        '2x': ref('@images/banner/букет-невест@2x.jpg'),
      },
      default: {
        '1x': ref('@images/banner/букет-невест@1.25x.jpg'),
      },
    },
    alt: 'букет состоящий из белых цветов',
  },
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    src: {
      'image/avif': {
        '1x': ref('/Flowers/src/assets/images/banner/букет-невест@1.25x.avif'),
        '2x': 'https://w.forfun.com/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg',
      },
      'image/webp': {
        '1x': ref('@images/banner/букет-невест@1.25x.webp'),
        '2x': ref('@images/banner/букет-невест@2x.webp'),
      },
      'image/jpeg': {
        '1x': ref('@images/banner/букет-невест@1.25x.jpg'),
        '2x': ref('@images/banner/букет-невест@2x.jpg'),
      },
      default: {
        '1x': ref('@images/banner/букет-невест@1.25x.jpg'),
      },
    },
    alt: 'букет состоящий из белых цветов',
  },
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    src: {
      'image/avif': {
        '1x': ref('/Flowers/src/assets/images/banner/букет-невест@1.25x.avif'),
        '2x': 'https://w.forfun.com/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg',
      },
      'image/webp': {
        '1x': ref('@images/banner/букет-невест@1.25x.webp'),
        '2x': ref('@images/banner/букет-невест@2x.webp'),
      },
      'image/jpeg': {
        '1x': ref('@images/banner/букет-невест@1.25x.jpg'),
        '2x': ref('@images/banner/букет-невест@2x.jpg'),
      },
      default: {
        '1x': ref('@images/banner/букет-невест@1.25x.jpg'),
      },
    },
    alt: 'букет состоящий из белых цветов',
  },
];

let currentSwiper;

const initSwiper = (swiper) => {
  currentSwiper = swiper;
};

const swipeToStart = (swiper) => {
  const { activeIndex } = swiper;
  const isLastSlide = (activeIndex === swiper.slides.length - 1);
  if (isLastSlide) {
    swiper.slideTo(0);
  }
};
</script>

<template>
  <Swiper
    tag="aside"
    class="swiper"
    @swiper="initSwiper"
    @reachEnd="swipeToStart"
    @focusin="currentSwiper.autoplay.stop()"
    @focusout="currentSwiper.autoplay.start()"
    slides-per-view="auto"
    space-between="12"
    :lazy-preload-prev-next="10"

    :modules="modules"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: true,
    }"
  >
    <Swiper-slide
      v-for="(slide, index) in slides"
      :key="index"
      @focus="currentSwiper.slideTo(index)"

      tag="a"
      class="slide"
      :href="slide.link"
      :aria-label="slide.description + '. Перейти к акции'"
    >
      <SrcToPicture
        class="image-wrapper"
        :slide-src="slide.src"
        :slide-alt="slide.alt"
        :images="images"
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
