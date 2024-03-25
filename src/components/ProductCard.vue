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
  layoutIsGrid: {
    type: Boolean,
    required: false,
    default: true,
  },
});

</script>

<template>
  <router-link
    :class="`card ${layoutIsGrid ? '_grid' : '_feed'}`"
    :aria-label="item.description"
    :to="`/Flowers/product?id=${item.id}`"
  >
    <ImgTemplate
      v-if="slideElements.includes('image')"
      class="image-wrapper"
      :slide-images-path="images"
      :slide-src="item.src"
      :alt="item.alt"
    />
    <div class="card__text">
      <header
        v-if="slideElements.includes('title')"
        class="card__title"
      >
        {{ item.title }}
      </header>
      <p
        class="card__paragraph"
        v-if="!layoutIsGrid"
      >
        {{ item.description }}
      </p>
      <div
        v-if="slideElements.includes('price')"
        class="card__button"
      >
        от {{ item.price }} ₽
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use '@vars/colors';

.card {
  font-family: "Arimo", sans-serif;
  display: flex;
  gap: 0.75rem;
  border-radius: 1rem;

  &:focus-visible {
    outline-offset: 0.25rem;
    outline-style: auto;
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  &__title {
    font-size: 1.25rem;
    line-height: 1.1;
  }

  &__button {
    font-size: 1.25rem;
    color: colors.$pink;
    padding: 0.5rem 1rem;
    box-shadow: 0 0 0 1px colors.$pink inset;
    border-radius: 0.5rem 1rem;
    transition: 200ms ease;

    &:hover {
      color: #fff;
      background-color: colors.$pink;
    }
  }
}

._feed {
  flex-direction: row;
  .card__text {
    height: 10rem;
  }
  .card__paragraph {
    flex: 1 1 0;
    color: colors.$dark-gray;
    overflow: hidden;
    font-size: 1rem;
    line-height: 1.2;
  }
  .image-wrapper {
    width: 10rem;
    height: 10rem;
  }
}

._grid {
  flex-direction: column;
  .image-wrapper {
    width: 100%;
    height: 100%;
  }
}

.image-wrapper {
  border-radius: 1rem;
  object-fit: cover;
}
</style>
