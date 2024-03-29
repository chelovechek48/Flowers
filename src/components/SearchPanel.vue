<script setup>
import ButtonSVG from '@components/ButtonSVG.vue';

const iconsList = [
  {
    id: 'logo',
    class: 'logo',
    iconRatio: '170 26',
    label: 'открыть домашнюю страницу сайта',
  },
  {
    id: 'search',
    label: 'открыть поиск',
  },
];
</script>

<template>
  <nav class="search-panel">
    <ul class="list">
      <li
        v-for="icon in iconsList"
        :key="icon.id"
      >
        <ButtonSVG
          :svg-class="(icon.class ? icon.class : 'icon')"
          :svg-id="icon.id"
          :aria-label="icon.label"
          :svg-ratio="icon.iconRatio"
        />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';
@use '@vars/breakpoints' as *;

.search-panel {
  z-index: 100;
  position: sticky;
  top: 0;
  height: 3.5rem;
  display: flex;
  align-items: center;
}

.list {
  padding: container.$padding;
  max-width: container.$width;
  width: 100%;
  margin-inline: auto;

  color: colors.$plum;
  background-color: colors.$white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: container.$padding;
}
</style>
