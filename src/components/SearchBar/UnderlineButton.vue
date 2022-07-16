<template>
  <button
    class="px-4 pt-1 pb-2 flex items-center justify-center text-lg font-medium relative"
    :class="{
      'selected-underline': active,
      'text-our-grey-kinda-dark': active,
      'text-our-grey-medium-medium': !active,
    }"
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
      active: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>

<style scoped>
  .selected-underline::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.25rem;
    border-radius: 5px;
    margin-top: 1.5rem;
    background: #e75252;
  }
</style>
