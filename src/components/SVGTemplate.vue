<script setup>
import { defineProps } from 'vue';
import spriteNavigation from '@icons/navigation.svg';
import spriteCatalog from '@icons/catalog.svg';

const sprites = {
  navigation: spriteNavigation,
  catalog: spriteCatalog,
};

const props = defineProps({
  sprite: {
    type: String,
    required: false,
    default: 'navigation',
  },
  id: {
    type: String,
    required: true,
  },
});

console.log(sprites);
console.log(sprites[props.sprite]);
console.log(sprites);

</script>

<template>
  <svg>
    <use :href="`${(sprites[sprite])}#${id}`" />
  </svg>
</template>

<style lang="scss" scoped>

</style>
