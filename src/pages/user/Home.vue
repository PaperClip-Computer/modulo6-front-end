<template>
  <Base
    :headerOptions="headerOptions"
    :hasSearchBar="hasSearchBar"
    :title="title"
    v-model:examSortOrder="examSortOrder"
  >
    <div
      v-for="(examItem, i) in orderedAndFilteredExamList"
      :key="i"
      class="px-3 py-2 flex flex-col"
    >
      <button @click="handleClickExam(examItem)">
        <ListItem :text="examItem.examName" :isPending="examItem.isPending" />
      </button>
      <span class="ml-4">{{ formatDate(examItem.date) }}</span>
    </div>
  </Base>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../../components/header/Header.vue';
import ListItem from '../../components/list/ListItem.vue';
import { ExamListItem, ExamSortOrder, HeaderOptions, UserRouteMeta } from '../../types/user';
import Base from './Base.vue';

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
          examName: 'Nome do Exame #1',
          isPending: false,
          date: '2022-05-14',
        },
        {
          examName: 'Nome do Exame #2',
          isPending: true,
          date: '2022-05-15',
        },
        {
          examName: 'Nome do Exame #1',
          isPending: false,
          date: '2022-05-14',
        },
        {
          examName: 'Nome do Exame #2',
          isPending: true,
          date: '2022-05-15',
        },
        {
          examName: 'Nome do Exame #1',
          isPending: false,
          date: '2022-05-14',
        },
        {
          examName: 'Nome do Exame #2',
          isPending: true,
          date: '2022-05-15',
        },
        {
          examName: 'Nome do Exame #1',
          isPending: false,
          date: '2022-05-14',
        },
        {
          examName: 'Nome do Exame #2',
          isPending: true,
          date: '2022-05-15',
        },
        {
          examName: 'Nome do Exame #1',
          isPending: false,
          date: '2022-05-14',
        },
        {
          examName: 'Nome do Exame #2',
          isPending: true,
          date: '2022-05-15',
        },
      ] as ExamListItem[],
      examSortOrder: 'desc' as ExamSortOrder,
      searchValue: '',
      headerOptions: {} as HeaderOptions,
      hasSearchBar: false,
      title: '',
    };
  },
  computed: {
    orderedAndFilteredExamList() {
      if ((this.$route.meta as UserRouteMeta).noPending) {
        this.examList = this.examList.filter(exam => !exam.isPending);
      }

      if ((this.$route.meta as UserRouteMeta).hasSearch) {
        this.examList = this.examList.filter(exam =>
          exam.examName.match(new RegExp(this.searchValue, 'i'))
        );
      }

      return this.examList.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
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
    handleClickExam(exam: ExamListItem) {
      if (exam.isPending) {
        return;
      }

      console.log('go to somewhere');
    },
    formatDate(date: string | Date) {
      if (typeof date == 'string') {
        date = new Date(date);
      }

      return [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear(),
      ].join('/');
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
      },
      search: () => {
        this.headerOptions = {
          hasGoBack: true,
          tabData: {
            iconName: 'search',
            title: 'Procurar',
          },
        };
        this.hasSearchBar = true;
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
        this.hasSearchBar = true;
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
