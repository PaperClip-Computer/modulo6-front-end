<template>
  <div v-if="ready">
    <Header />
    <div class="flex flex-col self-strech p-5">
      <SearchBarWithSelector v-model="innerSearchValue" v-model:selected="tab" :selectors="tabs" />
    </div>
    <div class="flex flex-col px-5 py-2" v-for="dataItem in filteredSelectedDataList">
      <ListItem
        :text="dataItem.text"
        :extraText="dataItem.extraText"
        @click.prevent="handleListItem(dataItem)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { defineComponent } from 'vue';
import api from '../../api';
import Header from '../../components/header/Header.vue';
import ListItem from '../../components/list/ListItem.vue';
import SearchBarWithSelector from '../../components/searchBar/SearchBarWithSelector.vue';
import { Doctor } from '../../types/api/doctor';
import { Exam } from '../../types/api/exam';
import { Selector } from '../../types/searchBar';

type Tab = 'pacient' | 'exam';

type CustomSelector = Omit<Selector, 'value'> & { value: Tab };

interface DataItem {
  id?: number;
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
      ready: false,
      doctor: {} as Doctor,
      exams: [] as Exam[],
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
      const filteredSelectedDataList = this.selectedDataList.filter((item: DataItem) => {
        const text = this.tab == 'pacient' && this.isSearchCpf ? item.extraText! : item.text;
        return !!text.match(new RegExp(`^${this.innerSearchValue}`, 'i'));
      });

      return !isEmpty(filteredSelectedDataList) ? filteredSelectedDataList : this.selectedDataList;
    },
    isSearchCpf() {
      const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
      return !!this.innerSearchValue.match(cpfRegex);
    },
    doctorPacients() {
      return this.doctor.pacients;
    },
    dataList() {
      return {
        exam: this.exams.map(exam => ({
          id: exam.id,
          text: exam.name,
        })),
        pacient: this.doctorPacients.map(pacient => ({
          id: pacient.id,
          text: pacient.name,
          extraText: pacient.cpf,
        })),
      } as Record<Tab, DataItem[]>;
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
              examId: dataItem.text,
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
    async fetchDoctor() {
      try {
        const { doctorId } = this.$route.params;
        this.doctor = (await api.doctor.get(Number(doctorId as string))).data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchExams() {
      try {
        this.exams = (await api.exam.exam.list()).data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchData() {
      await this.fetchDoctor();
      await this.fetchExams();
    },
  },
  mounted() {
    const queryTab = this.$route.query.tab as string;
    this.tab = this.isTab(queryTab) ? queryTab : 'pacient';

    this.fetchData().then(() => {
      this.ready = true;
    });
  },
});
</script>
