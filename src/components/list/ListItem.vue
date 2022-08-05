<template>
  <div class="flex flex-row justify-between items-center px-4 py-3 border-2 rounded-xl">
    <div class="flex flex-col items-start">
      <span class="font-medium text-xl text-our-grey-kinda-dark">
        {{ text }}
      </span>
      <span v-if="extraText" class="font-medium text-our-grey-kinda-dark-transparent">
        {{ extraText }}
      </span>
    </div>
    <div>
      <img :src="`/src/assets/icons/${iconName}.svg`" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isPending: {
      type: Boolean,
      default: false,
    },
    extraText: {
      type: String,
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
