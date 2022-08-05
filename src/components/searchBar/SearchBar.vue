<template>
  <div class="relative">
    <div
      class="flex flex-row items-center justify-between bg-our-grey-very-light p-4 gap-4 rounded-xl"
    >
      <input
        :placeholder="placeholder"
        v-model="value"
        class="text-our-grey-kinda-dark w-full text-2xl font-medium bg-transparent outline-none"
        v-maska="mask"
      />
      <button>
        <img src="@/assets/icons/search.svg" alt="" width="32" height="32" />
      </button>
    </div>
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
    mask: {
      type: String,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val: string) {
        this.$emit('update:modelValue', val);
      },
    },
  },
});
</script>

<style scoped></style>
