<template>
  <Header />
  <div class="flex flex-col self-strech p-5">
    <SearchBarWithSelector v-model="innerSearchValue" :button="getButton()" />
  </div>
  <div class="flex flex-col self-strech px-4 gap-y-5" v-for="dataItem in dataList">
    <ListItem :text="dataItem" @click.prevent="handleListItem()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../../components/header/Header.vue';
import ListItem from '../../components/list/ListItem.vue';
import SearchBarWithSelector from '../../components/searchBar/SearchBarWithSelector.vue';

export default defineComponent({
  components: {
    SearchBarWithSelector,
    Header,
    ListItem,
  },
  props: {
    searchValue: {
      type: String,
      default: '',
    },
  },
  data() {
    const dataList: string[] = ['Tiroglobulina'];

    return { dataList };
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
    getButton() {
      return this.$route.query.button as string;
    },
    handleListItem() {
      console.log('Go to List Item Info');
      this.$router.push({
        name: 'doctor.exam.info',
        params: {
          examId: 1,
        },
      });
    },
  },
});
</script>
