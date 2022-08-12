<template>
  <Base
    :headerOptions="headerOptions"
    title="Exames"
    v-model:examSortOrder="examSortOrder"
    v-model:searchValue="searchValue"
    class="max-h-screen overflow-hidden"
    innerClass="overflow-y-auto"
    v-if="ready"
  >
    <div
      v-for="(examSolicitation, i) in orderedAndFilteredExamList"
      :key="i"
      class="px-3 py-2 flex flex-col"
    >
      <button @click="handleClickExam(examSolicitation)">
        <ListItem :text="examSolicitation.exam.name" :isPending="!examSolicitation.examResult" />
      </button>
      <span class="ml-4">{{ formatDate(examSolicitation.requestDate) }}</span>
    </div>
  </Base>
</template>

<script lang="ts">
import { isEmpty, isNil } from 'lodash';
import { defineComponent } from 'vue';
import api from '../../../api';
import ListItem from '../../../components/list/ListItem.vue';
import { ExamSolicitation } from '../../../types/api/exam';
import { User } from '../../../types/api/user';
import { ExamSortOrder, HeaderOptions, UserRouteMeta } from '../../../types/user';
import { createUTCDate, formatDate } from '../../../utils/date';
import Base from '../../common/Base.vue';

export default defineComponent({
  components: {
    Base,
    ListItem,
  },
  data() {
    return {
      pacient: {} as User,
      examSortOrder: 'desc' as ExamSortOrder,
      searchValue: undefined as string | undefined,
      headerOptions: {
        hasGoBack: true,
      } as HeaderOptions,
      ready: false,
    };
  },
  computed: {
    isSearchDate() {
      return !!this.searchValue?.match(/\d{2}\/\d{2}\/\d{4}/);
    },
    examSolicitations() {
      return this.pacient.examSolicitations;
    },
    orderedAndFilteredExamList() {
      const searchFilteredExamList = (this.$route.meta as UserRouteMeta).hasSearch
        ? this.examSolicitations.filter(exam => {
            if (this.isSearchDate) {
              const requestDate = new Date(exam.requestDate);
              const searchDate = createUTCDate(this.searchValue ?? '');
              console.log(requestDate, searchDate);

              if (!searchDate) {
                return false;
              }

              return requestDate.toLocaleDateString() == searchDate.toLocaleDateString();
            }

            return !!exam.exam.name.match(new RegExp(`^${this.searchValue ?? ''}`, 'i'));
          })
        : null;

      const orderedAndFilteredExamList =
        !isNil(searchFilteredExamList) && (!isEmpty(searchFilteredExamList) || this.isSearchDate)
          ? searchFilteredExamList
          : this.examSolicitations;

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
    handleClickExam(examSolicitation: ExamSolicitation) {
      if (!examSolicitation.examResult) {
        return;
      }

      this.$router.push({
        name: 'doctor.pacient.exam.result',
        params: {
          examId: examSolicitation.id,
        },
      });
    },
    formatDate(dateString: string) {
      const date = new Date(dateString);

      return [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear(),
      ].join('/');
    },
    async fetchPacient() {
      try {
        const { id } = this.$route.params;
        this.pacient = (await api.user.get(Number(id as string))).data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchPacient().then(() => {
      this.ready = true;
    });
  },
});
</script>
