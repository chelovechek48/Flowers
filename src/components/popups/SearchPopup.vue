<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import products from '@/assets/data/products.json';
import ImgTemplate from '@components/ImgTemplate.vue';

const route = useRoute(); const router = useRouter();

const productsPath = import.meta.glob('@images/products/*.*');

const inputText = ref(route.query.search === ' ' ? '' : route.query.search);
const productsFilter = computed(() => {
  const text = inputText.value.toLowerCase();
  return products.filter((product) => product.title.toLowerCase().includes(text));
});

const searchModal = ref(null);
onMounted(() => {
  searchModal.value.showModal();
});
</script>

<template>
  <dialog
    ref="searchModal"
    class="search__wrapper"
    @close="router.push({ query: { search: undefined } })"
  >
    <div class="search">
      <div class="search__top search__container">
        <input
          class="search__input"
          type="search"
          placeholder="Введите"
          v-model="inputText"
          @change="router.push({ query: { search: inputText } })"
        >
        <button
          class="search__button"
          @click="router.push({ query: { search: undefined } })"
        >
          Закрыть
        </button>
      </div>
      <ul class="search__list search__container">
        <li
          v-for="product in productsFilter"
          :key="product.id"
        >
          <router-link
            class="search__item"
            :to="`product?id=${product.id}`"
          >
            <ImgTemplate
              class="search__image"
              :slide-images-path="productsPath"
              :slide-src="product.src"
              :alt="product.alt"
            />
            <h2 class="search__title">
              {{ product.title }}
            </h2>
          </router-link>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.search {
  font-family: "Arimo", sans-serif;
  min-height: 100dvh;
  margin-inline: calc((100% - min(100%, container.$width)) / 2);
  padding-top: 1rem;

  display: flex;
  flex-direction: column;

  &__wrapper {
    min-width: 100%;
    min-height: 100%;
    background-color: rgba(#000, 0.5);
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.75rem;
  }
  &__image {
    width: 2.5rem;
    border-radius: inherit;
  }
  &__title {
    font-weight: 400;
    font-size: 1.25rem;
    white-space: nowrap;
  }

  &__container {
    background-color: colors.$white;
    padding: container.$padding;
  }

  &__top {
    border-radius: 1rem 1rem 0 0;
    display: flex;
    justify-content: space-between;
    font-family: "Arimo", sans-serif;
    gap: container.$padding;
    font-size: 1.175rem;
  }

  &__input {
    background-color: colors.$medium-gray;
    width: 100%;

    &::-webkit-search-cancel-button {
      appearance: none;
    }
  }
  &__button {
    background-color: colors.$medium-gray;
  }

  &__input,
  &__button {
    font-family: inherit;
    font-size: inherit;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
  }

  &__list {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

</style>
