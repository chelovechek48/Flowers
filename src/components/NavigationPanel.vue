<script setup>
import ButtonSVG from '@components/ButtonSVG.vue';

const iconsList = [
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
          v-for="icon in iconsList"
          :key="icon.title"
        >
          <ButtonSVG
            :svg-path="icon.id"
            :button-text="icon.title"
            :aria-label="`Перейти в раздел ${icon.title}`"
            :link="icon.id"
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
