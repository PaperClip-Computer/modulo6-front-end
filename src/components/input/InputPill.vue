<template>
  <div class="flex flex-col items-stretch">
    <span class="font-roboto text-xl pb-2 font-semibold text-our-grey-kinda-dark">{{ title }}</span>
    <div class="flex">
      <Field
        :type="type"
        :name="name"
        v-model="innerModelValue"
        class="rounded-full border-2 py-2 px-4 w-full outline-none text-our-grey-kinda-dark font-semibold"
        :class="{ 'rounded-r-none': measureUnit }"
        :placeholder="placeholder"
        v-maska="mask"
      />
      <span
        v-if="measureUnit"
        class="rounded-full rounded-l-none border-2 border-l-0 bg-our-grey-very-light text-our-grey-kinda-dark-transparent font-semibold p-2"
      >
        {{ measureUnit }}
      </span>
    </div>
    <ErrorMessage :name="name" />
  </div>
</template>

<script lang="ts">
import { ErrorMessage, Field } from 'vee-validate';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      required: true,
    },
    measureUnit: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    mask: {
      type: String,
    },
  },
  computed: {
    innerModelValue: {
      get() {
        return this.modelValue;
      },
      set(value: any) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});
</script>

<style scoped></style>
