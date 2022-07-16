<template>
  <main class="flex flex-col min-h-screen font-roboto">
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({});
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
