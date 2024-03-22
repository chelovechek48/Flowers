<script setup>
import { ref } from 'vue';
import products from '@/assets/data/products.json';
import ProductCard from '@components/ProductCard.vue';
import spritePath from '@icons/sprite.svg';
import { useRoute, useRouter } from 'vue-router';

const productsPath = import.meta.glob('@images/products/*.*');
const importPath = (id) => `${spritePath}#${id}`;

const filterItems = [];
products.forEach((prod) => {
  if (!filterItems.includes(prod.filter)) {
    filterItems.push(prod.filter);
  }
});

const route = useRoute(); const router = useRouter();
const filterTag = ref(route.query.filter || filterItems[0]);
const feed = ref(true);
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
          v-for="(item, index) in filterItems"
          :key="item"
        >
          <input
            class="filter__input"
            type="radio"
            :id="item"
            name="catalog-filter"
            :value="item"
            :checked="route.query.filter ? (route.query.filter === item) : (index === 0)"
            v-model="filterTag"
            @change="router.push({ query: { filter: item } })"
          >
          <label
            class="filter__label"
            :for="item"
          >{{ item }}</label>
        </div>
      </div>
      <div class="choicer">
        <div
          v-for="it in ['grid', 'feed']"
          :key="it"
        >
          <input
            class="choicer__input"
            type="radio"
            name="feed"
            :id="it"
            v-model="feed"
            :value="it === 'feed'"
            :checked="it === 'feed'"
          >
          <label
            class="choicer__label"
            :for="it"
          >
            <svg class="choicer__icon">
              <use :href="importPath(it)" />
            </svg>
          </label>
        </div>
      </div>
    </aside>
    <ul :class="`list ${feed ? '_feed' : '_grid'}`">
      <li
        v-for="item in products.filter((prod) => prod.filter === filterTag)"
        :key="item.link"
      >
        <ProductCard
          :item="item"
          :images="productsPath"
          :slide-elements="[ 'image', 'title', 'price']"
          :feed="feed"
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
  padding: 0rem container.$padding container.$padding;
}

.aside {
  z-index: 200;
  position: sticky;
  top: 3.5rem;
  background-color: colors.$light-gray;

  display: flex; align-items: center; justify-content: space-between;
  gap: container.$padding;
  padding-inline: container.$padding;
  margin-inline: (0 - container.$padding);
}

.filter {
  width: 100%;
  display: flex;
  overflow-x: auto;

  padding-block: container.$padding;
  padding-left: container.$padding;
  margin-left: (0 - container.$padding);

  &__input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
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

  &__input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
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
