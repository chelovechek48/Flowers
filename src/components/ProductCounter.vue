<script setup>
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['countChanged']);
const props = defineProps({
  productCount: {
    type: Number,
    required: true,
  },
  minCount: {
    type: Number,
    required: false,
    default: 1,
  },
});
const count = ref(props.productCount);

const changeCount = (increment) => {
  count.value = Math.max(Number(count.value) + increment, props.minCount);
  emit('countChanged', count.value);
};
const formattingCount = () => {
  const formattingValue = Number(count.value.replace(/\D/g, ''));
  let validValue;
  if (formattingValue <= props.minCount) {
    validValue = props.minCount;
  } else if (formattingValue > 99) {
    validValue = 99;
  } else {
    validValue = formattingValue;
  }
  count.value = validValue;
  emit('countChanged', count.value);
};

</script>

<template>
  <div class="counter-wrapper">
    <button
      class="counter-button"
      aria-label="вычесть 1 из количества товара"
      @click.native.stop="changeCount(-1)"
      :disabled="count <= minCount"
    />
    <input
      class="counter"
      type="text"
      inputmode="numeric"
      v-model="count"
      @change="formattingCount()"
    >
    <button
      class="counter-button counter-button_increment"
      aria-label="добавить 1 к количеству товара"
      @click.native.stop="changeCount(+1)"
      :disabled="count >= 99"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/colors';

.counter {
  width: 2.5rem;
  height: 2.5rem;
  font-family: "Arimo", sans-serif;
  font-size: 1.5rem;
  text-align: center;
  background-color: transparent;
  &:focus {
    outline: none;
  }

  &-wrapper {
    z-index: 10;
    position: relative;

    display: flex;
    align-items: center;
  }
  &-button {
    width: 2rem;
    aspect-ratio: 1;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 0 2px 0 colors.$dark-gray;

    position: relative;
    &:before,
    &_increment:after {
      content: '';
      position: absolute;
      background-color: #000;
      top: calc(50% - 1px);
      left: 0.375rem;
      width: calc(100% - 0.75rem);
      height: 2px;
    }
    &_increment:after {
      transform: rotate(90deg);
      transform-origin: center;
    }

    &:disabled {
      background-color: colors.$light-gray;
    }
  }
}
</style>
