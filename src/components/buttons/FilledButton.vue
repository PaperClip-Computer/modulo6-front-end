<template>
  <button
    type="button"
    class="bg-our-red-light rounded-full px-4 py-3 flex items-center justify-center text-white text-2xl font-medium"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  });
</script>

<style scoped></style>
