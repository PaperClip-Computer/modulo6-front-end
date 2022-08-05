<template>
  <Header />
  <div class="flex flex-col self-strech p-5">
    <SearchBarWithSelector
      v-model="innerSearchValue"
      v-model:selected="tab"
      :selectors="tabs"
      :autoCompleteValues="dataList"
    />
  </div>
  <div class="flex flex-col px-5 py-2" v-for="dataItem in filteredSelectedDataList">
    <ListItem
      :text="dataItem.text"
      :extraText="dataItem.extraText"
      @click.prevent="handleListItem(dataItem)"
    />
  </div>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { defineComponent } from 'vue';
import Header from '../../components/header/Header.vue';
import ListItem from '../../components/list/ListItem.vue';
import SearchBarWithSelector from '../../components/searchBar/SearchBarWithSelector.vue';
import { Selector } from '../../types/searchBar';

type Tab = 'pacient' | 'exam';

type CustomSelector = Omit<Selector, 'value'> & { value: Tab };

interface DataItem {
  id: number;
  text: string;
  extraText?: string;
}

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
    return {
      dataList: {
        exam: [
          {
            id: 0,
            text: 'Tirogublina',
          },
          {
            id: 1,
            text: 'T3',
          },
          {
            id: 2,
            text: 'T4',
          },
          {
            id: 3,
            text: 'Colesterol',
          },
        ],
        pacient: [
          {
            id: 0,
            text: 'Jorge',
            extraText: '000.000.000-00',
          },
          {
            id: 1,
            text: 'Carlos',
            extraText: '111.111.111-11',
          },
        ],
      } as Record<Tab, DataItem[]>,
      tab: '' as Tab,
      tabs: [
        {
          value: 'pacient',
          label: 'Paciente',
          placeholder: 'Digite o nome ou CPF',
        },
        {
          value: 'exam',
          label: 'Exame',
          placeholder: 'Digite o nome do exame',
        },
      ] as CustomSelector[],
      _searchValue: this.searchValue,
    };
  },
  computed: {
    innerSearchValue: {
      get() {
        return this._searchValue;
      },
      set(value: string) {
        this._searchValue = value;
        this.$emit('update:searchValue', value);
      },
    },
    selectedDataList() {
      return this.dataList[this.tab] ?? [];
    },
    filteredSelectedDataList() {
      const filteredSelectedDataList = this.selectedDataList.filter(item => {
        const text = this.tab == 'pacient' && this.isSearchCpf ? item.extraText! : item.text;
        return !!text.match(new RegExp(`^${this.innerSearchValue}`, 'i'));
      });

      return !isEmpty(filteredSelectedDataList) ? filteredSelectedDataList : this.selectedDataList;
    },
    isSearchCpf() {
      const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
      return !!this.innerSearchValue.match(cpfRegex);
    },
  },
  methods: {
    isTab(value: string): value is Tab {
      return ['pacient', 'exam'].includes(value);
    },
    handleListItem(dataItem: DataItem) {
      switch (this.tab) {
        case 'exam':
          this.$router.push({
            name: 'doctor.exam.info',
            params: {
              examId: dataItem.id,
            },
          });
          return;
        case 'pacient':
          this.$router.push({
            name: 'doctor.pacient.info',
            params: {
              id: dataItem.id,
            },
          });
          return;
      }
    },
  },
  mounted() {
    const queryTab = this.$route.query.tab as string;
    this.tab = this.isTab(queryTab) ? queryTab : 'pacient';
  },
});
</script>
