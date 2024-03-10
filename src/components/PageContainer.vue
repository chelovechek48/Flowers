<script setup>
import SearchPanel from '@components/SearchPanel.vue';
import NavigationPanel from '@components/NavigationPanel.vue';
import FirstScreen from '@components/FirstScreen.vue';
</script>

<template>
  <div class="container">
    <SearchPanel />
    <NavigationPanel class="navigation" />
    <FirstScreen class="main" />
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/container' as container;

.container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-width: container.$width;
  height: 100vh;
  height: 100dvh;
  margin-inline: auto;

  background-color: #fff;
}

.navigation {
  order: 100;
}
</style>
