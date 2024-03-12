<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import { ref, onMounted } from 'vue';
import 'swiper/css';

const modules = [Autoplay];

const slides = [
  {
    link: '#',
    description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
    src: '/Flowers/src/assets/images/banner/букет-невест@2x.jpg',
    alt: 'букет состоящий из белых цветов',
  },
  // {
  //   link: '#',
  //   description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
  //   src: { computed: ref('/Flowers/src/assets/images/banner/букет-невест@2x.jpg') },
  //   alt: 'букет состоящий из белых цветов',
  // },
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
  // (async function getImagesCollection() {
  //   const images = import.meta.glob('@images/banner/*.*');
  //   const imagePaths = await Promise.all(
  //     Object.values(images).map(async (image) => {
  //       const module = await image();
  //       return module.default;
  //     }),
  //   );
  //   for (let i = 0; i < slides.length; i += 1) {
  //     const hasComputed = slides[i].src.computed.value;
  //     if (!hasComputed) {
  //       const src = slides[i].src.local.replace('@images', '/Flowers/src/assets/images');
  //       const filenameRegex = /^(.+?)(\.[^.]+)?$/;
  //       const filenameSplit = src.match(filenameRegex);
  //       const filename = {
  //         title: filenameSplit[1].split('/').pop(),
  //         extension: filenameSplit[2],
  //       };

  //       const imageHashed = imagePaths.find((path) => {
  //         const isEqual = (path.includes(filename.title) && path.includes(filename.extension));
  //         return isEqual;
  //       });
  //       slides[i].src.computed.value = imageHashed;
  //     }
  //   }
  // }());
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
    class="swiper"
    @swiper="initSwiper"
    @reachEnd="swipeToStart"
    @focusin="currentSwiper.autoplay.stop()"
    @focusout="currentSwiper.autoplay.start()"
    slides-per-view="auto"
    space-between="12"
    :lazy-preload-prev-next="0"

    :modules="modules"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: true,
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
          :src="slide.src"
          :alt="slide.alt"
          loading="lazy"
        >
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
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
</style>
