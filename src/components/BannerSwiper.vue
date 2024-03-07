<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import pathToAnyFile from '@images/banner/букет-невест@1.25x.webp';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay],
    };
  },
  methods: {
    getCurrentSwiper(swiper) {
      this.currentSwiper = swiper;
    },
    moveToSlide(index) {
      this.currentSwiper.slideTo(index);
    },
    getUpdatedImagePath(originalPath) {
      console.log(import.meta.env.BASE_URL, originalPath);
      return import.meta.env.BASE_URL + originalPath;
    },
  },
  data() {
    return {
      currentSwiper: undefined,
      folderPath: `${pathToAnyFile.substring(0, pathToAnyFile.lastIndexOf('/'))}/`,
      slides: [
        {
          link: '#',
          description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
          image: pathToAnyFile,
          alt: 'букет состоящий из белых цветов',
        },
        {
          link: '#',
          description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
          image: '/Flowers/src/assets/images/banner/букет-невест@1.25x.webp',
          alt: 'букет состоящий из белых цветов',
        },
        {
          link: '#',
          description: 'Дарим подставку на "букет невест", период проведения акции с 29 августа по первое сентября',
          image: `${pathToAnyFile.substring(0, pathToAnyFile.lastIndexOf('/'))}/букет-невест@1.25x.webp`,
          alt: 'букет состоящий из белых цветов',
        },
      ],
    };
  },
};
</script>

<template>
  <Swiper
    @Swiper="getCurrentSwiper"
    class="swiper"
    :loop="true"
    slides-per-view="auto"
    space-between="12"

    :modules="modules"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: true,
    }"
  >
    <Swiper-slide
      class="slide"
      v-for="(slide, index) in slides"
      :key="slide.link"
    >
      <a
        class="link"
        @focus="moveToSlide(index)"
        :href="slide.link"
        :aria-label="slide.description + '. Перейти к акции'"
      >
        <img
          class="image"
          :src="getUpdatedImagePath(slide.image)"
          :alt="slide.alt"
        >
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
  max-width: 20rem;
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
