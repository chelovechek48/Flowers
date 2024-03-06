<script setup>
import SearchPanel from '@components/SearchPanel.vue';
import BannerSwiper from '@components/BannerSwiper.vue';
</script>

<template>
  <section class="fiter-screen">
    <SearchPanel />
    <BannerSwiper />
  </section>
</template>

<style lang="scss" scoped>
.fiter-screen {
  padding-top: 70px;
}
</style>
