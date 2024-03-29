<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProductCard from '@components/ProductCard.vue';
import SvgTemplate from '@components/SvgTemplate.vue';

import productsList from '@/assets/data/products.json';

const productsPath = import.meta.glob('@images/products/*.*');

const props = defineProps({
  products: {
    type: Array,
    required: false,
    default: productsList,
  },
});

const filterTags = [];
props.products.forEach((prod) => {
  if (!filterTags.includes(prod.filter)) {
    filterTags.push(prod.filter);
  }
});

const route = useRoute(); const router = useRouter();
const filterTag = ref(route.query.filter || filterTags[0]);
const catalogLayoutIsGrid = ref(
  Boolean(
    JSON.parse(localStorage.getItem('catalogLayoutIsGrid')),
  ),
);

watch(catalogLayoutIsGrid, (newValue) => {
  localStorage.setItem('catalogLayoutIsGrid', newValue);
});

</script>

<template>
  <section
    class="catalog"
    tabindex="-1"
  >
    <aside class="aside">
      <div
        class="filter"
        tabindex="-1"
      >
        <div
          v-for="(tagName, index) in filterTags"
          :key="tagName"
        >
          <input
            class="filter__input visually-hidden"
            type="radio"
            name="catalog-filter"
            :id="tagName"
            :checked="route.query.filter ? (route.query.filter === tagName) : (index === 0)"
            :value="tagName"
            v-model="filterTag"
            @change="router.push({ query: { filter: tagName } })"
          >
          <label
            class="filter__label"
            :for="tagName"
          >{{ tagName }}</label>
        </div>
      </div>
      <div class="choicer">
        <div
          v-for="direction in ['grid', 'feed']"
          :key="direction"
        >
          <input
            class="choicer__input visually-hidden"
            type="radio"
            name="layout-direction"
            :id="direction"
            :value="direction === 'grid'"
            v-model="catalogLayoutIsGrid"
          >
          <label
            class="choicer__label"
            :for="direction"
          >
            <SvgTemplate
              class="choicer__icon"
              :id="direction"
            />
          </label>
        </div>
      </div>
    </aside>
    <ul :class="`list ${catalogLayoutIsGrid ? '_grid' : '_feed'}`">
      <li
        v-for="product in products.filter((product) => product.filter === filterTag)"
        :key="product.id"
      >
        <ProductCard
          :item="product"
          :images="productsPath"
          :slide-elements="['image', 'title', 'price']"
          :layout-is-grid="catalogLayoutIsGrid"
        />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.catalog {
  display: flex; flex-direction: column;
  gap:  (container.$padding * 1.5);
  padding: 0rem container.$padding 1rem container.$padding;
}

.aside {
  z-index: 200;
  position: sticky;
  top: 3.5rem;
  background-color: colors.$light-gray;

  display: flex; align-items: center; justify-content: space-between;
  gap: container.$padding;
  padding: 0.5rem container.$padding;
  margin-inline: (0 - container.$padding);
}

.filter {
  width: 100%;
  display: flex;
  overflow-x: auto;

  padding-left: container.$padding;
  margin-left: (0 - container.$padding);
  padding-block: container.$padding;
  margin-block: 0 - container.$padding;

  &__input:checked + &__label {
    background-color: colors.$medium-gray;
  }
  &__input:focus-visible + &__label {
    outline: auto;
  }
  &__label {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    white-space: nowrap;
    padding: 0.25rem 0.5rem;
    margin-block: -0.25rem;
    border-radius: 1rem;
    cursor: pointer;
  }
}

.choicer {
  display: flex;
  gap: container.$padding;

  &__label {
    display: block;
    padding: 0.5rem;
    margin: -0.5rem;
    cursor: pointer;
  }
  &__input:checked + &__label &__icon {
    color: colors.$pink;
  }
  &__input:focus-visible + &__label {
    outline: auto;
  }
  &__icon {
    color: colors.$dark-gray;
    display: block;
    height: 1.75rem;
    width: 1.75rem;
  }
}

.list {
  display: grid;
  gap: (container.$padding * 1.5) container.$padding;
  &._feed {
    grid-template-columns: 1fr;
  }
  &._grid {
    grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
  }
}
</style>
