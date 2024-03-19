<script setup>
import ButtonSVG from '@components/ButtonSVG.vue';

const navigationItems = [
  {
    id: 'main',
    title: 'Главная',
    alt: 'цветочек',
  },
  {
    id: 'catalog',
    title: 'Каталог',
    alt: 'лупа',
  },
  {
    id: 'cart',
    title: 'Корзина',
    alt: 'сумка с товарами',
  },
  {
    id: 'favorites',
    title: 'Избранное',
    alt: 'сердечко',
  },
  {
    id: 'profile',
    title: 'Профиль',
    alt: 'пользователь',
  },
];
</script>

<template>
  <header class="navigation-panel">
    <nav style="width: 100%">
      <ul class="list">
        <li
          v-for="item in navigationItems"
          :key="item.title"
        >
          <ButtonSVG
            :svg-path="item.id"
            :button-text="item.title"
            :aria-label="`Перейти в раздел ${item.title}`"
            :link="item.id"
          />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '@vars/colors';
@use '@vars/container';

.list {
  color: colors.$gray;
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  max-width: container.$width;
  padding: 0.5rem container.$padding;
  margin-inline: auto;

  background-color: colors.$white;
  border-top: solid 1px colors.$gray;
}

.navigation-panel {
  bottom: 0;
  order: 100;
  flex: 1 1 0;
  display: flex;
  align-items: flex-end;
  z-index: 100;
  position: sticky;
}
</style>
