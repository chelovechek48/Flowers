<script setup>
import ButtonSVG from '@components/ButtonSVG.vue';

const iconsList = [
  {
    id: 'map-marker',
    label: 'открыть карту',
  },
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
          :svg-class-name="(icon.class ? icon.class : 'icon')"
          :svg-path="icon.id"
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
}

.list {
  padding: container.$padding;
  max-width: container.$width;
  margin-inline: auto;

  color: colors.$plum;
  background-color: colors.$white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: container.$padding;
}
</style>
