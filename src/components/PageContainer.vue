<script setup>
import SearchPanel from '@components/SearchPanel.vue';
import NavigationPanel from '@components/NavigationPanel.vue';
import FirstScreen from '@components/FirstScreen.vue';
</script>

<template>
  <div class="container">
    <NavigationPanel class="navigation" />
    <SearchPanel class="search-panel" />
    <FirstScreen class="main" />
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/container' as container;

.container {
  max-width: container.$width;
  min-height: 100vh;
  min-height: 100dvh;
  margin-inline: auto;
  padding-block: 3.75rem;

  background-color: #fff;
}

.navigation,
.search-panel {
  z-index: 100;
  position: fixed;
  left: 0;
  width: 100%;
}
.navigation {
  bottom: 0;
}
.search-panel {
  top: 0;
}
</style>
