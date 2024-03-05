<script setup>
import UserNavigation from '@components/UserNavigation.vue';
</script>

<template>
  <div class="container">
    <UserNavigation />
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
