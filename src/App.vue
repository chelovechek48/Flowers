<script setup>
import NavigationPanel from '@components/NavigationPanel.vue';
import SearchPopup from '@popups/SearchPopup.vue';
import ProductPopup from '@popups/ProductPopup.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="container">
    <NavigationPanel
      v-if="!['card'].includes(route.name)"
    />
    <router-view />
    <SearchPopup v-if="route.query.search" />
    <ProductPopup v-if="route.query.id" />
  </div>
</template>

<style lang="scss">
@forward '@styles';
@use '@vars/container' as container;

.container {
  max-width: container.$width;
  min-height: 100vh;
  min-height: 100dvh;
  margin-inline: auto;

  background-color: #fff;

  display: flex;
  flex-direction: column;
}

body {
  background: rgb(209, 209, 209);
}
</style>
