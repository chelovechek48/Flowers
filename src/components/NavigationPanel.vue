<script>
import spritePath from '@icons/navigation/sprite.svg';

export default {
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
  methods: {
    importPath(id) {
      return `${spritePath}#${id}`;
    },
  },
};
</script>

<template>
  <header class="navigation">
    <nav class="container">
      <ul class="navigation__list">
        <li
          v-for="item in navigationItems"
          :key="item.title"
          :item="item"
        >
          <a
            class="navigation__link"
            :href="`#${item.id}`"
            :aria-label="`открыть раздел ${item.title}`"
          >
            <svg
              class="navigation__image"
              viewBox="0 0 1 1"
            >
              <use :href="importPath(item.id)" />
            </svg>
            <span class="navigation__title">
              {{ item.title }}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';
@use '@vars/breakpoints' as *;

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

  &__link {
    color: colors.$gray;
    font-family: "Inter", sans-serif;
    font-size: clamp(0.5rem, 3.5vw, 1.25rem);
    font-weight: 500;

    transition: 200ms ease;

    &:hover,
    &.active {
      color: colors.$pink;
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
