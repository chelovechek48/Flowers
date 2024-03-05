<script>
export default {
  props: {
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
    ariaLabel: {
      type: String,
      required: true,
    },
  },
  computed: {
    viewBox() {
      return `0 0 ${this.svgRatio}`;
    },
  },
};
</script>

<template>
  <a
    class="link"
    href=""
    :aria-label="ariaLabel"
  >
    <svg
      :class="svgClassName"
      :viewBox="viewBox"
    >
      <use :href="svgPath" />
    </svg>
    <span
      v-if="buttonText"
      class="text"
    >
      {{ buttonText }}
    </span>
  </a>
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
  font-family: "Inter", sans-serif;
  font-size: clamp(0.5rem, 3.5vw, 1.25rem);
  font-weight: 500;

  padding: container.$padding;
  margin: (0 - container.$padding);

  transition: 200ms ease;
  &:hover,
  &.active {
    color: colors.$pink;
  }
}
.icon {
  @media (min-width: calc($mobile-small + 1px)) {
    height: 1.75rem;
  }
  @media (max-width: $mobile-small) {
    height: 12vw;
  }
}
.logo {
  width: 100%;
  max-width: 18rem;
}
.text {
  @media (max-width: $mobile-small) {
    display: none;
  }
}
</style>
