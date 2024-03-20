<script setup>
import SearchPanel from '@components/SearchPanel.vue';
import NavigationPanel from '@components/NavigationPanel.vue';
</script>

<template>
  <div class="container">
    <NavigationPanel
      v-if="$route.path === '/Flowers/home' || $route.path === '/Flowers/catalog'"
    />
    <SearchPanel
      v-if="$route.path === '/Flowers/home' || $route.path === '/Flowers/catalog'"
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
