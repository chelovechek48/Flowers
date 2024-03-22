<script setup>
import { defineProps } from 'vue';
import spritePath from '@icons/sprite.svg';
import spritePathFeed from '@icons/sprite-feed.svg';

const sprites = {
  main: spritePath,
  feed: spritePathFeed,
};

const props = defineProps({
  sprite: {
    type: String,
    required: false,
    default: 'main',
  },
  id: {
    type: String,
    required: true,
  },
});

console.log(spritePath, spritePathFeed);
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
