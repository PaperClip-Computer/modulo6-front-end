<template>
  <div class="flex flex-row items-center justify-between bg-[#f5f5f5] p-4 gap-4 rounded-xl">
    <input
      :placeholder="placeholder"
      v-model="value"
      class="text-our-grey-kinda-dark w-full text-2xl font-medium bg-transparent outline-none"
    />
    <button>
      <img src="@/assets/icons/search.svg" alt="" width="32" height="32" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});
</script>

<style scoped></style>
