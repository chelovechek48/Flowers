<script setup>
import { defineProps } from 'vue';
import spritePath from '@icons/sprite.svg';

defineProps({
  sprite: {
    type: String,
    required: false,
    default: spritePath,
  },
  id: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <svg>
    <use :href="`${(sprite)}#${id}`" />
  </svg>
</template>

<style lang="scss" scoped>

</style>
