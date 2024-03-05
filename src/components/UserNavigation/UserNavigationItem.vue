<script>
import spritePath from '@icons/navigation/sprite.svg';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    importPath() {
      return `${spritePath}#${this.item.id}`;
    },
  },
};
</script>

<template>
  <li>
    <a
      class="navigation__link"
      href=""
      :aria-label="`открыть раздел ${item.title}`"
    >
      <svg
        class="navigation__image"
        viewBox="0 0 1 1"
      >
        <use :href="importPath" />
      </svg>
      <span class="navigation__title">
        {{ item.title }}
      </span>
    </a>
  </li>
</template>

<style lang="scss" scoped>
@use '@vars/colors' as *;
@use '@vars/breakpoints' as *;

.navigation {
  &__link {
    color: $gray;
    font-family: "Inter", sans-serif;
    font-size: clamp(0.5rem, 3.5vw, 1.25rem);
    font-weight: 500;

    transition: 200ms ease;

    &:hover,
    &.active {
      color: $pink;
    }

    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__image {
    @media (min-width: calc($mobile-small + 1px)) {
      height: 1.75rem;
    }
    @media (max-width: $mobile-small) {
      height: 12vw;
    }
  }

  @media (max-width: $mobile-small) {
    &__title {
      display: none;
    }
  }
}
</style>
