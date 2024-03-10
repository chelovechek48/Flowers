<script setup>
import BannerSwiper from '@components/BannerSwiper.vue';
</script>

<template>
  <main class="first-screen">
    <BannerSwiper />
  </main>
</template>

<style lang="scss" scoped>
@use '@vars/container';

.first-screen {
  flex: 1 1 0;
  overflow-y: auto;
  padding: container.$padding;
}
</style>
