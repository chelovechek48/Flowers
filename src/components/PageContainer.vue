<script setup>
import NavigationPanel from '@components/NavigationPanel.vue';
import FirstScreen from '@components/FirstScreen.vue';
</script>

<template>
  <div class="container">
    <NavigationPanel />
    <FirstScreen />
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/container' as container;

.container {
  max-width: container.$width;
  min-height: 100vh;
  padding: container.$padding;
  margin-inline: auto;

  background-color: #fff;
}
</style>
