<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import bannerImage from '@images/banner/букет-невест@1.25x.webp';

const images = import.meta.glob('@images/banner/*.*');

const obj = {
  imageUrls: Object.keys(images).map((path) =>
    // Возвращаем результат динамического импорта изображения
    images[path]().then((module) => module.default)),
};
const list = Object.keys(images).map((item) => {
  images[item]().then((path) => path);
  return item;
});
console.log(`Object.keys${list}`);

const listKeys = obj.imageUrls.map((item) => {
  item.then((path) => path);
  return item;
});
console.log(`imageUrls${listKeys}`);

// const url = (p) => {
//   const pp = p.replace('@images', '/Flowers/src/assets/images');
//   const filter = Object.keys(images).find((path) => {
//     console.log('');
//     return images[path]().then((module) => {
//       console.log(module.default);
//       return module.default;
//     });
//   });
//   console.log(`filter:${filter}`);

//   return `/Flowers${filter}`;
// };

// const url = (p, i) => {
//   const pp = p.replace('@images', '/Flowers/src/assets/images');
//   const find = obj.imageUrls.find((path) => {
//     console.log(path);
//     path.then((module) => {
//       console.log(path);
//       return module === pp;
//     });
//     return '';
//   });
//   return find;
// };

const slides = [
  {
    id: 1,
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    // image: images['/src/assets/images/banner/букет-невест@1.25x.jpg'],
    image: '/Flowers/src/assets/images/banner/букет-невест@1.25x.webp',
    // image: images['/Flowers/src/assets/images/banner/букет-невест@1.25x.webp'],
    alt: 'букет состоящий из белых цветов',
  },
  // {
  //   id: 2,
  //   link: '#',
  //   description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
  //   image: bannerImage,
  //   alt: 'букет состоящий из белых цветов',
  // },
  // {
  //   id: 3,
  //   link: '#',
  //   description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
  //   // image: bannerImage,
  //   image: '/Flowers/src/assets/images/banner/букет-невест@1.25x.webp?',
  //   alt: 'букет состоящий из белых цветов',
  // },
];

const modules = [Autoplay];
let currentSwiper;

const initSwiper = (swiper) => {
  currentSwiper = swiper;
};
const swipeToStart = (swiper) => {
  const { activeIndex } = swiper;
  if (activeIndex === swiper.slides.length - 1) {
    swiper.slideTo(0);
  }
};
const moveToSlide = (index) => {
  currentSwiper.slideTo(index);
};

</script>

<template>
  <Swiper
    @swiper="initSwiper"
    @reachEnd="swipeToStart"
    class="swiper"
    slides-per-view="auto"
    space-between="12"
    :lazy="true"

    :modules="modules"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: true,
    }"
  >
    <Swiper-slide
      class="slide"
      v-for="(slide, index) in slides"
      :key="slide.id"
    >
      <a
        class="link"
        :id="slide.id"
        @focus="moveToSlide(index)"
        :href="slide.link"
        :aria-label="slide.description + '. Перейти к акции'"
      >
        <img
          class="image"
          :src="slide.image"
          :alt="slide.alt"
        >
        <div
          class="swiper-lazy image"
          :data-src="slide.image"
          :alt="slide.alt"
        />
        <div class="swiper-lazy-preloader" />
      </a>
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
  aspect-ratio: 398/225;
  max-width: min(90%, 20rem);
  height: 100%;
  object-fit: cover;
}
.link {
  display: block;
  border-radius: 1rem;
  overflow: hidden;
}
.image {
  width: 100%;
}
</style>
