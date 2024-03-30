<script setup>
import { defineEmits, defineProps, ref } from 'vue';

import ImgTemplate from '@components/ImgTemplate.vue';
import SvgTemplate from '@components/SvgTemplate.vue';
import ProductCounter from '@components/ProductCounter.vue';

const emit = defineEmits(['countChanged']);
const props = defineProps({
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
  isSlide: {
    type: Boolean,
    required: false,
    default: false,
  },
  isCart: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const cartStorage = JSON.parse(localStorage.getItem('cart-storage')) || {};
const count = ref(
  cartStorage[props.item.id] || 1,
);

const addToCart = (newCount) => {
  count.value = newCount;
  const currentCartStorage = JSON.parse(localStorage.getItem('cart-storage')) || {};
  if (newCount > 0) {
    currentCartStorage[props.item.id] = newCount;
  } else {
    delete currentCartStorage[props.item.id];
  }
  localStorage.setItem('cart-storage', JSON.stringify(currentCartStorage));

  emit('countChanged', { id: props.item.id, count: newCount });
};

const favorites = JSON.parse(localStorage.getItem('favorites-storage')) || [];
const addToFavorites = (id) => {
  const currentFavoritesStorage = JSON.parse(localStorage.getItem('favorites-storage')) || [];
  const index = currentFavoritesStorage.indexOf(id);
  const checkboxList = document.querySelectorAll(`[data-id="${id}"]`);
  if (index + 1) {
    currentFavoritesStorage.splice(index, 1);
  } else {
    currentFavoritesStorage.push(id);
  }
  for (let i = 0; i < checkboxList.length; i += 1) {
    checkboxList[i].checked = !(index + 1);
  }
  localStorage.setItem('favorites-storage', JSON.stringify(currentFavoritesStorage));
};
</script>

<template>
  <div :class="`card ${layoutIsGrid ? '_grid' : '_feed'}`">
    <router-link
      class="card__link"
      :aria-label="item.description"
      :to="`product?id=${item.id}`"
      :tabindex="isSlide ? '-1' : ''"
    />
    <div
      class="favorites"
      v-if="slideElements.includes('favorites')"
    >
      <input
        class="favorites__input visually-hidden"
        type="checkbox"
        name="liked"
        :id="`liked-${item.id}`"
        :data-id="item.id"
        @click="addToFavorites(item.id)"
        :checked="favorites.indexOf(item.id) + 1"
        :tabindex="isSlide ? '-1' : ''"
      >
      <label
        class="favorites__label"
        :for="`liked-${item.id}`"
      >
        <SvgTemplate
          class="favorites__icon"
          id="favorites-fill"
        />
      </label>
    </div>
    <ImgTemplate
      v-if="slideElements.includes('image')"
      class="card__image"
      :slide-images-path="images"
      :slide-src="item.src"
      :alt="item.alt"
    />
    <div
      class="card__text"
      v-if="slideElements.length !== 1"
    >
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
        :class="`card__button ${slideElements.includes('counter')
          ? 'card__button_absolute'
          : 'card__button_default'}`"
        :aria-label="item.description"
      >
        {{
          slideElements.includes('counter')
            ?`${item.price * count} ₽`
            : `от ${item.price} ₽`
        }}
      </div>
      <ProductCounter
        v-if="slideElements.includes('counter')"
        @countChanged="addToCart($event)"
        :product-count="count"
        :min-count="0"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.favorites {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;

  &__icon {
    color: inherit;
    cursor: pointer;
    height: 2.5rem;
    transition: 200ms;
  }

  &__label {
    color: rgba(colors.$white, 0.9);
    display: flex;
    padding: container.$padding;
    margin: 0 - container.$padding;
  }
  &__input:checked + &__label {
    color: rgba(colors.$pink, 0.9);
  }
  &__input:focus-visible + &__label {
    outline: auto;
  }
}

.card {
  font-family: "Arimo", sans-serif;
  display: flex;
  gap: 0.75rem;
  position: relative;

  &__link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 1rem;
    &:focus-visible {
      outline-offset: 0.25rem;
      outline-style: auto;
    }
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
    padding: 0.5rem 1rem;
    border-radius: 0.5rem 1rem;
    transition: 200ms ease;
      color: colors.$pink;

    &_default {
      background-color: colors.$white;
      box-shadow: 0 0 0 1px colors.$pink inset;
    }
    &_absolute {
      background-color: colors.$white;
      pointer-events: none;

      position: absolute;
      bottom: 0.5rem;
      left: 0.5rem;
    }
  }
  &:hover &__button_default,
  &:focus-within &__button_default {
    color: colors.$white;
    background-color: colors.$pink;
  }
}

._feed {
  flex-direction: row;
  .card__text {
    height: min(45vw, 10rem);
  }
  .card__paragraph {
    flex: 1 1 0;
    color: colors.$dark-gray;
    overflow: hidden;
    font-size: 1rem;
    line-height: 1.2;
  }
  .card__image {
    width: min(45vw, 10rem);
    height: min(45vw, 10rem);
  }
}

._grid {
  flex-direction: column;
  .card__image {
    width: 100%;
    height: 100%;
  }
}

.card__image {
  border-radius: 1rem;
  object-fit: cover;
}
</style>
