<template>
  <div class="flex gap-2 rounded-lg items-center justify-start bg-white p-2">
    <div>
      <img :src="`/src/assets/icons/${iconName}.svg`" alt="" height="24" width="24" />
    </div>
    <span class="text-our-grey-kinda-dark font-semibold">
      {{ title }}
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      iconName: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  });
</script>

<style scoped></style>
