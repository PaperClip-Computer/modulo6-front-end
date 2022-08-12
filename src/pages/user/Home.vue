<template>
  <Base
    :headerOptions="headerOptions"
    :title="title"
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
        <ListItem :text="examSolicitation.exam.name" />
      </button>
      <span class="ml-4">{{ formatDate(examSolicitation.requestDate) }}</span>
    </div>
  </Base>
</template>

<script lang="ts">
import { isEmpty, isNil } from 'lodash';
import { defineComponent } from 'vue';
import Header from '../../components/header/Header.vue';
import ListItem from '../../components/list/ListItem.vue';
import { User } from '../../types/api/user';
import { ExamSortOrder, HeaderOptions, UserRouteMeta } from '../../types/user';
import { createUTCDate, formatDate } from '../../utils/date';
import Base from '../common/Base.vue';

import api from '../../api';
import { ExamSolicitation } from '../../types/api/exam';

export default defineComponent({
  components: {
    Header,
    ListItem,
    Base,
  },
  data() {
    return {
      user: {} as User,
      examSortOrder: 'desc' as ExamSortOrder,
      searchValue: undefined as string | undefined,
      headerOptions: {} as HeaderOptions,
      title: '',
      ready: false,
    };
  },
  computed: {
    isSearchDate() {
      return !!this.searchValue?.match(/\d{2}\/\d{2}\/\d{4}/);
    },
    examSolicitations() {
      return this.user.examSolicitations;
    },
    examsConcluded() {
      return this.examSolicitations.filter(exam => exam.examResult);
    },
    examsUnconcluded() {
      return this.examSolicitations.filter(exam => !exam.examResult);
    },
    orderedAndFilteredExamList() {
      const doneFilteredExamList = (this.$route.meta as UserRouteMeta).done
        ? this.examsConcluded
        : this.examsUnconcluded;

      const searchFilteredExamList = (this.$route.meta as UserRouteMeta).hasSearch
        ? doneFilteredExamList.filter(exam => {
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
    handleClickExam(examSolicitation: ExamSolicitation) {
      this.$router.push(
        examSolicitation.examResult
          ? {
              name: 'user.exam.result',
              params: {
                examId: examSolicitation.id,
              },
            }
          : {
              name: 'user.exam.info',
              params: {
                examId: examSolicitation.id,
              },
            }
      );
    },
    formatDate(dateString: string) {
      const date = new Date(dateString);

      return [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear(),
      ].join('/');
    },
    async fetchUser() {
      try {
        const { id } = this.$route.params;
        this.user = (await api.user.get(Number(id as string))).data;
      } catch (error) {
        console.error(error);
      }
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

    this.fetchUser().then(() => {
      this.ready = true;
      console.log(this.user);
    });
  },
});
</script>
