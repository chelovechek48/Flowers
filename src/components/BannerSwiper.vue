<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import { ref } from 'vue';
import 'swiper/css';

const modules = [Autoplay];

const slides = [
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    src: {
      computed: ref(undefined),
      avif: {
        '1.25x': '@images/banner/букет-невест@1.25x.avif',
        '2x': '@images/banner/букет-невест@2x.webp',
      },
      default: '@images/banner/букет-невест@1.25x.jpg',
    },
    alt: 'букет состоящий из белых цветов',
  },
  // {
  //   link: '#',
  //   description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
  //   src: { local: '@images/banner/букет-невест@1.25x.webp', computed: ref(undefined) },
  //   alt: 'букет состоящий из белых цветов',
  // },
  // {
  //   link: '#',
  //   description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
  //   src: { local: '@images/banner/букет-невест@1.25x.jpg', computed: ref(undefined) },
  //   alt: 'букет состоящий из белых цветов',
  // },
];

let currentSwiper;

const initSwiper = (swiper) => {
  currentSwiper = swiper;
  (async function getImagesCollection() {
    const images = import.meta.glob('@images/banner/*.*');
    const imagePaths = await Promise.all(
      Object.values(images).map(async (image) => {
        const module = await image();
        return module.default;
      }),
    );
    for (let i = 0; i < slides.length; i += 1) {
      const hasComputed = slides[i].src.computed.value;
      if (!hasComputed) {
        const src = slides[i].src.default.replace('@images', '/Flowers/src/assets/images');

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
        slides[i].src.computed.value = imageHashed;
      }
    }
  }());
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
      <picture>
        <source
          type="image/avif"
          srcset="@images/banner/букет-невест@1.25x.avif"
        >
        <img src="@images/banner/букет-невест@1.25x.jpg">
      </picture>
      <!-- <img
        class="image"
        :src="slide.src.computed.value"
        :alt="slide.alt"
        loading="lazy"
      > -->
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
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
</style>
