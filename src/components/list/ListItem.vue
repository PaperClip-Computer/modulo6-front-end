<template>
  <div class="flex flex-row justify-between items-center px-4 py-3 border-2 rounded-xl">
    <span class="font-roboto font-medium text-xl text-our-grey-kinda-dark">
      {{ text }}
    </span>
    <div>
      <img :src="`/src/assets/icons/${iconName}.svg`" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    isPending: {
      type: Boolean,
      default: false,
    },
    extraText: {
      type: Object as PropType<string | null>,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return this.isPending ? 'pending' : 'arrow_forward';
    },
  },
});
</script>

<style scoped></style>
