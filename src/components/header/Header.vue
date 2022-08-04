<template>
  <header class="flex items-center justify-between bg-our-red-light py-3 px-4">
    <div class="flex items-center">
      <button v-if="hasGoBack" class="pr-4" @click="goBack">
        <img src="@/assets/icons/arrow_back.svg" alt="" height="32" width="32" />
      </button>
      <span class="text-white font-bold text-3xl"> FitSys </span>
    </div>
    <div v-if="hasOptions">
      <Options @tabClicked="handleTabClicked" />
    </div>
    <div v-if="Object.keys(tabData).length != 0">
      <Tab :iconName="tabData.iconName" :title="tabData.title" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TabData, TabTitle } from '../../types/header';

import Options from './Options.vue';
import Tab from './Tab.vue';

export default defineComponent({
  components: {
    Options,
    Tab,
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
  methods: {
    goBack() {
      this.$router.back();
    },
    handleTabClicked(tab: TabData) {
      const tabTitleToRoute: { [key in TabTitle]: string } = {
        Gráfico: 'user.graph',
        Histórico: 'user.history',
        'Meu Doutor': 'user.doctor',
        Procurar: 'user.search',
      };

      this.$router.push({
        name: tabTitleToRoute[tab.title],
      });
    },
  },
});
</script>

<style scoped></style>
