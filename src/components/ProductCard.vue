<script setup>
import { defineProps } from 'vue';

import ImgTemplate from '@components/ImgTemplate.vue';

defineProps({
  item: {
    type: Object,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  slideElements: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <router-link
    class="slide"
    :aria-label="item.description"
    :tabindex="-1"
    :to="`/Flowers/card?id=${item.id}`"
  >
    <ImgTemplate
      v-if="slideElements.includes('image')"
      class="image-wrapper"
      :slide-images-path="images"
      :slide-src="item.src"
      :alt="item.alt"
    />
    <header
      v-if="slideElements.includes('title')"
      class="slide__title"
    >
      {{ item.title }}
    </header>
    <div
      v-if="slideElements.includes('price')"
      class="slide__button"
    >
      от {{ item.price }} ₽
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use '@vars/colors';

.slide {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 1rem;

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
    border-radius: 0.5rem 1rem;
    transition: 200ms ease;

    &:hover {
      color: #fff;
      background-color: colors.$pink;
    }
  }
}

.image-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
}
</style>
