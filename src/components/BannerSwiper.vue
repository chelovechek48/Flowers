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
      default: ref('@images/banner/букет-невест@1.25x.jpg'),
      options: {
        'image/avif': {
          x1: ref('@images/banner/букет-невест@1.25x.avif'),
          x2: ref('@images/banner/букет-невест@2x.avif'),
        },
        'image/webp': {
          x1: ref('@images/banner/букет-невест@1.25x.webp'),
          x2: ref('@images/banner/букет-невест@2x.webp'),
        },
      },
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
      const replace = (img, type) => {
        console.log(img);
        const isLink = !(typeof img === 'object' && img !== null);
        if (!isLink) {
          const src = img.value.replace('@images', '/Flowers/src/assets/images');

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
          if (typeof type === 'object' && type !== null) {
            slides[i].src.options[type.type][type.size].value = imageHashed;
          } else {
            slides[i].src.default.value = imageHashed;
          }
        }
      };

      const options = Object.entries(slides[i].src.options);

      options.forEach((option) => {
        const imagesArray = Object.entries(option[1]);
        imagesArray.forEach((image) => {
          const type = {
            type: option[0],
            size: image[0],
          };
          replace(image[1], type);
        });
      });

      const defaultImage = slides[i].src.default;
      replace(defaultImage, 'default');
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
      <picture class="image-wrapper">
        <source
          type="image/avif"
          :srcset="slide.src.options['image/avif']['x1'].value"
        >
        <img
          class="image"
          :src="slide.src.default.value"
          :alt="slide.alt"
        >
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
  &, &-wrapper {
    border-radius: inherit;
  }
}
</style>
