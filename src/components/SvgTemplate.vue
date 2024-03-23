<script setup>
import { defineProps } from 'vue';
import sprite from '@icons/sprite.svg';

defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <svg>
    <use :href="`${sprite}#${id}`" />
  </svg>
</template>

<style lang="scss" scoped>

</style>
