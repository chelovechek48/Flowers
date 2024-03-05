<script setup>
</script>

<template>
  <div class="container">
    <h1>123</h1>
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/container' as container;

.container {
  max-width: container.$width;
  min-height: 100vh;
  padding: container.$padding;
  margin-inline: auto;

  background-color: #fff;
}
</style>
