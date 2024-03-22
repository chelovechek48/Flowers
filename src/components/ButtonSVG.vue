<script setup>
import { defineProps } from 'vue';

import spritePath from '@icons/sprite.svg';

const props = defineProps({
  sprite: {
    type: String,
    required: false,
    default: null,
  },
  svgClassName: {
    type: String,
    required: false,
    default: 'icon',
  },
  svgPath: {
    type: String,
    required: true,
  },
  svgRatio: {
    type: String,
    required: false,
    default: '1 1',
  },
  buttonText: {
    type: String,
    required: false,
    default: '',
  },
  link: {
    type: String,
    required: false,
    default: '/Flowers/home',
  },
});
console.log(props.sprite);
const importPath = (id) => `${(props.sprite)}#${id}`;

</script>

<template>
  <router-link
    class="link"
    :to="link"
  >
    <svg
      :class="svgClassName"
      :viewBox="`0 0 ${svgRatio}`"
    >
      <use :href="importPath(svgPath)" />
    </svg>
    <span
      v-if="buttonText"
      class="text"
    >
      {{ buttonText }}
    </span>
  </router-link>
</template>

<style lang="scss" scoped>
@use '@vars/colors';
@use '@vars/container';
@use '@vars/breakpoints' as *;

.link {
  display: flex;
  flex-direction: column;
  gap: 5px;

  color: inherit;

  padding: container.$padding;
  margin: (0 - container.$padding);

  outline-offset: -0.5rem;
  transition: 200ms ease;
  &:hover,
  &.active {
    color: colors.$pink;
  }
}
.icon {
  height: 1.5rem;
}
.logo {
  width: 100%;
  max-height: 2rem;
}
.text {
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  @media (max-width: $mobile-small) {
    display: none;
  }
}
</style>
