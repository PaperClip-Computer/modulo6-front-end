<template>
  <Base
    :headerOptions="headerOptions"
    title="Exames"
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
        <ListItem :text="examItem.name" :isPending="!examItem.done" />
      </button>
      <span class="ml-4">{{ formatDate(examItem.requestDate) }}</span>
    </div>
  </Base>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { defineComponent } from 'vue';
import ListItem from '../../../components/list/ListItem.vue';
import { ExamRequest } from '../../../types/exam';
import { ExamSortOrder, HeaderOptions } from '../../../types/user';
import { createUTCDate, formatDate } from '../../../utils/date';
import Base from '../../common/Base.vue';

export default defineComponent({
  components: {
    Base,
    ListItem,
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
      headerOptions: {
        hasGoBack: true,
      } as HeaderOptions,
    };
  },
  computed: {
    isSearchDate() {
      return !!this.searchValue?.match(/\d{2}\/\d{2}\/\d{4}/);
    },
    orderedAndFilteredExamList() {
      const searchedExamList = this.examList.filter(exam => {
        if (this.isSearchDate) {
          const requestDate = createUTCDate(exam.requestDate)!;
          const searchDate = createUTCDate(this.searchValue ?? '');

          if (!searchDate) {
            return false;
          }

          return requestDate.getTime() == searchDate.getTime();
        }

        return !!exam.name.match(new RegExp(`^${this.searchValue ?? ''}`, 'i'));
      });

      const filteredExamList = !isEmpty(searchedExamList) ? searchedExamList : this.examList;

      return filteredExamList.sort((a, b) => {
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
      if (!exam.done) {
        return;
      }

      this.$router.push({
        name: 'user.exam.result',
        params: {
          userId: 1,
          examId: exam.id,
        },
      });
    },
    formatDate(date: string) {
      return formatDate(date);
    },
  },
});
</script>
