<script setup>
import { defineProps } from 'vue';
import sprite from '@icons/sprite.svg';

defineProps({
  id: {
    type: String,
    required: true,
  },
  viewBox: {
    type: String,
    required: false,
    default: '0 0 1 1',
  },
});
</script>

<template>
  <svg :viewBox="viewBox">
    <use :href="`${sprite}#${id}`" />
  </svg>
</template>

<style lang="scss" scoped>

</style>
