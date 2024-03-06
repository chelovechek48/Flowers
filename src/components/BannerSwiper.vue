<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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
};
</script>

<template>
  <Swiper
    class="swiper"
    :loop="true"
    slides-per-view="auto"
    space-between="12"

    :modules="modules"
    :autoplay="{delay: 2500}"
  >
    <Swiper-slide class="slide">
      <a href="">
        <img
          class="image"
          src="@images/banner/букет-невест@1.25x.jpg"
          alt=""
        >
      </a>
    </Swiper-slide>
    <Swiper-slide class="slide">
      <a href="">
        <img
          class="image"
          src="@images/banner/букет-невест@1.25x.jpg"
          alt=""
        >
      </a>
    </Swiper-slide>
    <Swiper-slide class="slide">
      <a href="">
        <img
          class="image"
          src="@images/banner/букет-невест@1.25x.jpg"
          alt=""
        >
      </a>
    </Swiper-slide>
  </Swiper>
</template>

<style lang="scss" scoped>
@use '@vars/container';

.swiper {
  padding-inline: container.$padding;
  margin-inline: (0 - container.$padding);
}
.slide {
  max-width: 20rem;
}
.image {
  width: 100%;
  border-radius: 1rem;
}
</style>
