<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { onMounted } from 'vue';

const modules = [Autoplay];

const slides = [
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    image: {
      src: undefined,
      localPath: '@images/banner/букет-невест@2x.jpgsss',
      alt: 'букет состоящий из белых цветов',
    },
  },
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    image: {
      src: undefined,
      localPath: '@images/banner/букет-невест@1.25x.webp',
      alt: 'букет состоящий из белых цветов',
    },
  },
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    image: {
      src: undefined,
      localPath: '@images/banner/букет-невест@1.25x.jpg',
      alt: 'букет состоящий из белых цветов',
    },
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

onMounted(async () => {
  const images = import.meta.glob('@images/banner/*.*');
  const imagePaths = await Promise.all(
    Object.values(images).map(async (image) => {
      const module = await image();
      return module.default;
    }),
  );
  for (let i = 0; i < slides.length; i += 1) {
    const src = slides[i].image.localPath.replace('@images', '/Flowers/src/assets/images');
    const filenameRegex = /^(.+?)(\.[^.]+)?$/;
    const filenameSplit = src.match(filenameRegex);
    const filename = {
      title: filenameSplit[1].split('/').pop(),
      extension: filenameSplit[2],
    };

    const imageHashed = imagePaths.find((path) => {
      const isEqual = (path.includes(filename.title) && path.includes(filename.extension));
      return isEqual;
    });
    slides[i].image.src = imageHashed;
  }
  currentSwiper.slideNext(); currentSwiper.slidePrev();
});
</script>

<template>
  <Swiper
    @swiper="initSwiper"
    @reachEnd="swipeToStart"
    @focusin="currentSwiper.autoplay.stop()"
    @focusout="currentSwiper.autoplay.start()"
    class="swiper"
    slides-per-view="auto"
    space-between="12"
    :lazy="true"
    lazy-preload-prev-next="0"

    :modules="modules"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
  >
    <Swiper-slide
      class="slide"
      v-for="(slide, index) in slides"
      :key="index"
    >
      <a
        class="link"
        @focus="currentSwiper.slideTo(index)"
        :href="slide.link"
        :aria-label="slide.description + '. Перейти к акции'"
      >
        <img
          class="image"
          :src="slide.image.src"
          :alt="slide.image.alt"
          loading="lazy"
        >
        <div
          class="swiper-lazy image"
          :data-src="slide.image.src"
          :alt="slide.image.alt"
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
  height: 100%;
}
.image {
  width: 100%;
  border-radius: inherit;
}
</style>
