<template>
  <Base
    :headerOptions="headerOptions"
    :title="title"
    v-model:examSortOrder="examSortOrder"
    v-model:searchValue="searchValue"
    class="max-h-screen overflow-hidden"
    innerClass="overflow-y-auto"
  >
    <div
      v-for="(examItem, i) in orderedAndFilteredExamList"
      :key="i"
      class="px-3 py-2 flex flex-col"
    >
      <button @click="handleClickExam(examItem)">
        <ListItem :text="examItem.name" />
      </button>
      <span class="ml-4">{{ formatDate(examItem.requestDate) }}</span>
    </div>
  </Base>
</template>

<script lang="ts">
import { isEmpty, isNil } from 'lodash';
import { defineComponent } from 'vue';
import Header from '../../components/header/Header.vue';
import ListItem from '../../components/list/ListItem.vue';
import { ExamRequest } from '../../types/exam';
import { ExamSortOrder, HeaderOptions, UserRouteMeta } from '../../types/user';
import { createUTCDate, formatDate } from '../../utils/date';
import Base from '../common/Base.vue';

export default defineComponent({
  components: {
    Header,
    ListItem,
    Base,
  },
  data() {
    return {
      examList: [
        {
          id: 0,
          name: 'Tirogublina',
          requestDate: '2022-05-10',
          done: true,
          unitMeasure: 'ng/dL',
        },
        {
          id: 1,
          name: 'T3',
          requestDate: '2022-05-11',
          done: true,
          unitMeasure: 'ng/dL',
        },
        {
          id: 2,
          name: 'Tirogublina',
          requestDate: '2022-05-20',
          done: false,
          unitMeasure: 'ng/dL',
        },
        {
          id: 3,
          name: 'T4',
          requestDate: '2022-05-15',
          done: false,
          unitMeasure: 'ng/dL',
        },
        {
          id: 4,
          name: 'Colesterol',
          requestDate: '2022-05-21',
          done: false,
          unitMeasure: 'ng/dL',
        },
      ] as ExamRequest[],
      examSortOrder: 'desc' as ExamSortOrder,
      searchValue: undefined as string | undefined,
      headerOptions: {} as HeaderOptions,
      title: '',
    };
  },
  computed: {
    isSearchDate() {
      return !!this.searchValue?.match(/\d{2}\/\d{2}\/\d{4}/);
    },
    orderedAndFilteredExamList() {
      const doneFilteredExamList = this.examList.filter(exam =>
        (this.$route.meta as UserRouteMeta).done ? exam.done : !exam.done
      );

      const searchFilteredExamList = (this.$route.meta as UserRouteMeta).hasSearch
        ? doneFilteredExamList.filter(exam => {
            if (this.isSearchDate) {
              const requestDate = createUTCDate(exam.requestDate)!;
              const searchDate = createUTCDate(this.searchValue ?? '');

              if (!searchDate) {
                return false;
              }

              return requestDate.getTime() == searchDate.getTime();
            }

            return !!exam.name.match(new RegExp(`^${this.searchValue ?? ''}`, 'i'));
          })
        : null;

      const orderedAndFilteredExamList =
        !isNil(searchFilteredExamList) && !isEmpty(searchFilteredExamList)
          ? searchFilteredExamList
          : doneFilteredExamList;

      return orderedAndFilteredExamList.sort((a, b) => {
        const dateA = new Date(a.requestDate);
        const dateB = new Date(b.requestDate);
        switch (this.examSortOrder) {
          case 'asc':
            return dateA.getTime() - dateB.getTime();
          case 'desc':
            return dateB.getTime() - dateA.getTime();
        }
      });
    },
  },
  methods: {
    handleClickExam(exam: ExamRequest) {
      this.$router.push({
        name: exam.done ? 'user.exam.result' : 'user.exam.info',
        params: {
          examId: exam.id,
        },
      });
    },
    formatDate(date: string) {
      return formatDate(date);
    },
  },
  mounted() {
    const currentRoute = this.$route.name!.toString();
    const routeHandler = {
      home: () => {
        this.headerOptions = {
          hasGoBack: false,
          hasOptions: true,
        };
        this.title = 'Exames Pendentes';
        this.searchValue = undefined;
      },
      search: () => {
        this.headerOptions = {
          hasGoBack: true,
          tabData: {
            iconName: 'search',
            title: 'Procurar',
          },
        };
        this.searchValue = '';
        this.title = 'Exames Pendentes';
      },
      history: () => {
        this.headerOptions = {
          hasGoBack: true,
          tabData: {
            iconName: 'restore',
            title: 'Histórico',
          },
        };
        this.searchValue = '';
        this.title = 'Exames Já Feitos';
      },
    };

    for (const [routeName, routeCallback] of Object.entries(routeHandler)) {
      if (!currentRoute.includes(routeName)) {
        continue;
      }

      routeCallback();
    }
  },
});
</script>
