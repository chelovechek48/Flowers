<script setup>
import UserNavigationList from '@components/UserNavigation/UserNavigationList.vue';
</script>

<template>
  <div class="container">
    <UserNavigationList />
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/container' as container;

.container {
  max-width: container.$width;
  min-height: 100vh;
  padding-inline: container.$padding;
  margin-inline: auto;

  background-color: #fff;
}
</style>
