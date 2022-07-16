<template>
  <header class="flex items-center justify-between bg-our-red-light py-3 px-4">
    <div class="flex items-center">
      <div v-if="hasGoBack" class="pr-4">
        <img src="@/assets/icons/arrow_back.svg" alt="" height="32" width="32" />
      </div>
      <span class="text-white font-bold text-3xl"> FitSys </span>
    </div>
    <div v-if="hasOptions">
      <OptionsVue />
    </div>
    <div v-if="Object.keys(tabData).length != 0">
      <TabVue :iconName="tabData.iconName" :title="tabData.title" />
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { TabData } from '../../types/header';

  import OptionsVue from './Options.vue';
  import TabVue from './Tab.vue';

  export default defineComponent({
    components: {
      OptionsVue,
      TabVue,
    },
    props: {
      hasGoBack: {
        type: Boolean,
        default: false,
      },
      hasOptions: {
        type: Boolean,
        default: false,
      },
      tabData: {
        type: Object as PropType<TabData>,
        default: {},
      },
    },
  });
</script>

<style scoped></style>
