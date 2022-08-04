<template>
  <div class="flex flex-col items-center justify-center rounded-xl shadow-md">
    <div
      class="bg-our-red-light rounded-t-lg flex justify-center p-2 w-full text-white text-2xl font-medium"
      :class="{
        'text-center': !justify,
        'text-justify': justify,
      }"
    >
      <span>{{ name }}</span>
    </div>
    <div
      class="rounded-b-lg border border-t-0 flex justify-center p-2 w-full text-our-grey-kinda-dark text-xl"
      :class="{
        'text-center': !justify,
        'text-justify': justify,
      }"
    >
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: '-',
    },
    justify: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style scoped></style>
