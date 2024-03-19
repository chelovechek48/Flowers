<script setup>
import ButtonSVG from '@components/ButtonSVG.vue';

const panelItems = [
  {
    id: 'map-marker',
  },
  {
    id: 'logo',
    class: 'logo',
    iconRatio: '170 26',
  },
  {
    id: 'search',
  },
];
</script>

<template>
  <nav class="search-panel">
    <ul class="list">
      <li
        v-for="item in panelItems"
        :key="item.id"
      >
        <ButtonSVG
          :svg-class-name="(item.class ? item.class : 'icon')"
          :svg-path="item.id"
          aria-label="Открыть карты"
          :svg-ratio="item.iconRatio"
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
