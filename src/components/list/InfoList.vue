<template>
  <div class="flex flex-col">
    <div
      v-if="superior"
      class="flex flex-col justify-center gap-y-0 items-center font-roboto"
      :class="itemClass"
    >
      <span>{{ superior.name }}</span>
      <span class="text-base">{{ superior.age }} anos</span>
    </div>
    <div
      v-for="(value, name, i) in list"
      :key="i"
      class="grid grid-cols-2 justify-between items-center first:border-0 border-t-2 font-roboto"
      :class="itemClass"
    >
      <span class="text-left">{{ name }}</span>
      <span class="text-right">{{ value }}</span>
    </div>
    <div
      v-if="inferior"
      class="flex justify-center items-center border-t-2 font-roboto"
      :class="itemClass"
    >
      <span class="text-sm text-our-grey-kinda-dark-transparent">CPF: {{ inferior }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface SuperiorProp{
        name: String,
        age: Number
      }

export default defineComponent({
  props: {
    list: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    itemClass: {
      type: [ String, Array<string>, Object ],
      default: ''
    },
    superior: {
      type: Object as PropType<SuperiorProp>,
      default: null
    },
    inferior: {
      type: String,
      default: ''
    }
  },
});
</script>

<style scoped></style>
