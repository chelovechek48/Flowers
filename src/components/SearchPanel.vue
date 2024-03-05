<script>
import spritePath from '@icons/search-panel/sprite.svg';
import ButtonSVG from '@components/ButtonSVG.vue';

export default {
  components: {
    ButtonSVG,
  },
  methods: {
    importPath(id) {
      return `${spritePath}#${id}`;
    },
  },
};

</script>

<template>
  <nav class="search-panel">
    <ul class="list">
      <li>
        <ButtonSVG :svg-path="importPath('map-marker')" />
      </li>
      <li>
        <ButtonSVG
          aspect-ratio="170 26"
          svg-class-name="logo"
          :svg-path="importPath('logo')"
        />
      </li>
      <li>
        <ButtonSVG :svg-path="importPath('search')" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';
@use '@vars/breakpoints' as *;

.search-panel {
  z-index: 100;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.list {
  max-width: container.$width;
  padding: container.$padding;
  margin-inline: auto;

  color: colors.$plum;
  background-color: colors.$white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: container.$padding;
}
</style>
