<template>
  <main class="flex flex-col min-h-screen font-roboto">
    <router-view :key="$route.fullPath"> </router-view>
  </main>
</template>

<script lang="ts">
import { configure } from 'vee-validate';
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    configure({
      validateOnBlur: true,
    });
  },
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
