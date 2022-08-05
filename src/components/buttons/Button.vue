<template>
  <button
    :type="type"
    class="rounded-full px-4 py-3 flex items-center justify-center text-2xl font-medium disabled:bg-neutral-400"
    :class="{
      'bg-our-red-light': style === 'filled',
      'hover:bg-our-red-dark': style === 'filled',
      'active:bg-our-red-dark': style === 'filled',
      'text-white': style === 'filled',

      'bg-white': style !== 'filled',
      'hover:bg-our-grey-very-light': style !== 'filled',
      'active:bg-our-grey-very-light': style !== 'filled',
      'text-our-red-light': style !== 'filled',
      border: style !== 'filled',
      'border-[3px]': style !== 'filled',
      'border-our-red-light': style !== 'filled',
    }"
    :disabled="disabled"
  >
    <div v-if="isLoading">
      <Svg src="/src/assets/icons/loading-animated.svg" />
    </div>
    <div v-else class="w-full">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    style: {
      type: String as PropType<'filled' | 'hollow'>,
      default: 'filled',
    },
  },
});
</script>

<style scoped></style>
