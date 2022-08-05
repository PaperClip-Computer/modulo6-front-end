<template>
  <div class="flex flex-col">
    <Header v-bind="headerOptions" />
    <div v-if="hasInnerSearchValue" class="p-4 pb-0">
      <SearchBar v-model="innerSearchValue" :placeholder="searchPlaceholder" />
    </div>
    <div v-if="title" class="flex flex-row justify-between items-center p-5 shadow-md bg-white">
      <span class="font-roboto font-semibold text-2xl text-our-grey-kinda-dark">
        {{ title }}
      </span>
      <button v-if="hasExamSortOrder" @click="changeOrder">
        <img :src="`/src/assets/icons/data_${examSortOrder}.svg`" alt="" />
      </button>
    </div>
    <div class="flex flex-col py-2 grow" :class="innerClass">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { isNil } from "lodash";
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
    searchValue: {
      type: String,
    },
    examSortOrder: {
      type: String as PropType<ExamSortOrder>,
    },
    innerClass: {
      type: [ String, Array<string>, Object ],
      default: ''
    },
    searchPlaceholder: {
      type: String,
      default: 'Palavra ou Data'
    }
  },
  computed: {
    innerSearchValue: {
      get() {
        return this.searchValue!;
      },
      set(value: string) {
        this.$emit('update:searchValue', value);
      },
    },
    hasInnerSearchValue() {
      return !isNil(this.searchValue)
    },
    hasExamSortOrder() {
      return !isNil(this.examSortOrder)
    }
  },
  methods: {
    changeOrder() {
      this.$emit('update:examSortOrder', this.examSortOrder == 'desc' ? 'asc' : 'desc');
    },
  },
});
</script>

<style scoped></style>
