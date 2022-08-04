<template>
  <div class="flex flex-col max-h-screen overflow-hidden">
    <Header v-bind="headerOptions" />
    <div v-if="innerSearchValue" class="p-4 pb-0">
      <SearchBar v-model="innerSearchValue" placeholder="Palavra ou Data" />
    </div>
    <div v-if="title" class="flex flex-row justify-between items-center p-5 shadow-md bg-white">
      <span class="font-roboto font-semibold text-2xl text-our-grey-kinda-dark">
        {{ title }}
      </span>
      <button v-if="hasTitleButton" @click="changeOrder">
        <img :src="`/src/assets/icons/data_${examSortOrder}.svg`" alt="" />
      </button>
    </div>
    <div class="flex flex-col py-2 overflow-y-auto grow">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Header from '../../components/header/Header.vue';
import SearchBar from '../../components/searchBar/SearchBar.vue';
import { ExamSortOrder, HeaderOptions } from '../../types/user';

export default defineComponent({
  components: { Header, SearchBar },
  props: {
    headerOptions: {
      type: Object as PropType<HeaderOptions>,
      default: {},
    },
    title: {
      type: String,
    },
    hasTitleButton: {
      type: Boolean,
      default: true,
    },
    searchValue: {
      type: String,
    },
    examSortOrder: {
      type: String as PropType<ExamSortOrder>,
    },
  },
  computed: {
    innerSearchValue: {
      get() {
        return this.searchValue;
      },
      set(value: string) {
        console.log(value);
        this.$emit('update:searchValue', value);
      },
    },
  },
  methods: {
    changeOrder() {
      this.$emit('update:examSortOrder', this.examSortOrder == 'desc' ? 'asc' : 'desc');
    },
  },
});
</script>

<style scoped></style>
