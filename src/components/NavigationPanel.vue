<script>
import spritePath from '@icons/navigation-panel/sprite.svg';
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
  data() {
    return {
      navigationItems: [
        {
          title: 'Главная',
          id: 'main',
          alt: 'цветочек',
        },
        {
          title: 'Каталог',
          id: 'catalog',
          alt: 'лупа',
        },
        {
          title: 'Корзина',
          id: 'cart',
          alt: 'сумка с товарами',
        },
        {
          title: 'Избранное',
          id: 'favorites',
          alt: 'сердечко',
        },
        {
          title: 'Профиль',
          id: 'profile',
          alt: 'пользователь',
        },
      ],
    };
  },
};
</script>

<template>
  <header class="navigation">
    <nav class="container">
      <ul class="list">
        <li
          v-for="item in navigationItems"
          :key="item.title"
          :item="item"
        >
          <ButtonSVG
            :icon-text="item.title"
            :svg-path="importPath(item.id)"
          />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.container {
  max-width: container.$width;
  padding: 0.5rem container.$padding;
  margin-inline: auto;

  background-color: colors.$white;
  border-top: solid 1px colors.$gray;
}

.navigation {
  z-index: 100;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

.list {
  color: colors.$gray;
  display: flex;
  justify-content: space-between;
}
</style>
