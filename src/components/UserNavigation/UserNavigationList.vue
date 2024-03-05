<script>
import UserNavigationItem from '@components/UserNavigation/UserNavigationItem.vue';

export default {
  components: {
    UserNavigationItem,
  },
  data() {
    return {
      navigationItems: [
        {
          title: 'Главная',
          id: 'main',
          alt: '',
        },
        {
          title: 'Каталог',
          id: 'catalog',
          alt: '',
        },
        {
          title: 'Корзина',
          id: 'cart',
          alt: '',
        },
        {
          title: 'Избранное',
          id: 'favorites',
          alt: '',
        },
        {
          title: 'Профиль',
          id: 'profile',
          alt: '',
        },
      ],
    };
  },
};
</script>

<template>
  <header class="navigation">
    <nav class="container">
      <ul class="navigation__list">
        <UserNavigationItem
          v-for="navigationItem in navigationItems"
          :key="navigationItem.title"
          :item="navigationItem"
        />
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

  &__list {
    display: flex;
    justify-content: space-between;
  }
}
</style>
