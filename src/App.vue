<script setup>
import SearchPanel from '@components/SearchPanel.vue';
import NavigationPanel from '@components/NavigationPanel.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="container">
    <NavigationPanel
      v-if="['home', 'catalog', 'cart'].includes(route.name)"
    />
    <SearchPanel
      v-if="['home', 'catalog'].includes(route.name)"
    />
    <router-view />
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
