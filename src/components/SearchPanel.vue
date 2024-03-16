<script setup>
import spritePath from '@icons/search-panel/sprite.svg';
import ButtonSVG from '@components/ButtonSVG.vue';

const importPath = (id) => `${spritePath}#${id}`;
</script>

<template>
  <nav>
    <ul class="list">
      <li>
        <ButtonSVG
          :svg-path="importPath('map-marker')"
          aria-label="Открыть карты"
        />
      </li>
      <li>
        <ButtonSVG
          svg-class-name="logo"
          :svg-path="importPath('logo')"
          svg-ratio="170 26"
          aria-label="Перейти на главную страницу"
        />
      </li>
      <li>
        <ButtonSVG
          :svg-path="importPath('search')"
          aria-label="Открыть поиск"
        />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';
@use '@vars/breakpoints' as *;

.list {
  padding: container.$padding;
  max-width: container.$width;
  margin-inline: auto;

  color: colors.$plum;
  background-color: colors.$white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: container.$padding;
}
</style>
