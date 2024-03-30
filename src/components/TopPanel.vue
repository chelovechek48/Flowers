<script setup>
import ButtonSVG from '@components/ButtonSVG.vue';
import SearchPopup from '@popups/SearchPopup.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
  <nav class="search-panel">
    <ul class="list">
      <li>
        <ButtonSVG
          svg-class="logo"
          svg-id="logo"
          aria-label="открыть домашнюю страницу сайта"
          svg-ratio="170 26"
        />
      </li>
      <li class="search">
        <ButtonSVG
          :link="`?search= `"
          svg-id="search"
          aria-label="открыть поиск"
        />
      </li>
    </ul>
    <SearchPopup v-if="route.query.search" />
  </nav>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';
@use '@vars/breakpoints' as *;

.search-panel {
  z-index: 1000;
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
