<template>
  <div class="flex flex-col" v-if="ready">
    <Header v-bind="headerOptions" />
    <div class="p-4 flex flex-col">
      <span class="text-3xl font-bold pb-4 text-our-grey-kinda-dark">Gráfico</span>
      <SearchBarWithAutoComplete
        v-model="examSearch"
        placeholder="Insira o nome do exame"
        :autoCompleteValues="examNames"
      />
      <span class="text-our-grey-kinda-dark pt-2" v-if="currentExamMeasureUnit">
        Unidade de medida: <span class="font-bold"> {{ currentExamMeasureUnit }} </span>
      </span>
    </div>
    <div class="flex flex-col gap-4 pb-4" v-if="filteredExams.length > 0">
      <Graph :exams="filteredExams" v-model="selectedExamIndex" class="border-b-2 border-t-2" />
      <div class="flex flex-col">
        <InfoList
          class="rounded-xl border-2 mx-4 rounded-b-none border-b-0"
          itemClass="gap-4 bg-our-grey-very-light p-4 font-semibold text-our-grey-kinda-dark text-lg"
          :list="{
            'Data de Liberação do Resultado:': selectedExam.examResult
              ? formatDate(selectedExam.examResult.resultDate)
              : '-',
            'Data de Realização do Exame:': selectedExam.examResult
              ? formatDate(selectedExam.examResult.measureDate)
              : '-',
            'Resultado:': selectedExam.examResult?.result
              ? `${selectedExam.examResult?.result} ${selectedExam.exam.measureUnit}`
              : '-',
          }"
        />
        <Button
          class="mx-4 rounded-xl py-2 rounded-t-none"
          :class="{ 'rounded-b-none': showDocument }"
          :disabled="!selectedExam?.examResult?.result"
          @click="toggleShowDocument"
        >
          <div class="flex flex-row gap-10 justify-between items-center pl-1">
            <span class="text-lg">Ver documento</span>
            <div :class="{ 'rotate-90 transition-all': showDocument }">
              <img src="@/assets/icons/arrow_forward_tail.svg" alt="" />
            </div>
          </div>
        </Button>
        <Transition name="fade">
          <FilePreview
            v-if="showDocument && selectedExamDocument"
            :file="selectedExamDocument"
            :download="true"
            :roundedTop="false"
            class="px-4"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../api';
import Button from '../../components/buttons/Button.vue';
import Graph from '../../components/graph/Graph.vue';
import Header from '../../components/header/Header.vue';
import FilePreview from '../../components/input/FilePreview.vue';
import InfoList from '../../components/list/InfoList.vue';
import SearchBar from '../../components/searchBar/SearchBar.vue';
import SearchBarWithAutoComplete from '../../components/searchBar/SearchBarWithAutoComplete.vue';
import { ExamSolicitation } from '../../types/api/exam';
import { User } from '../../types/api/user';
import { FilePreview as FilePreviewType } from '../../types/input';
import { HeaderOptions } from '../../types/user';
import { formatDate } from '../../utils/date';
import Base from './Base.vue';

export default defineComponent({
  components: {
    Base,
    Graph,
    InfoList,
    Button,
    SearchBar,
    Header,
    FilePreview,
    SearchBarWithAutoComplete,
  },
  data() {
    return {
      headerOptions: {
        hasGoBack: true,
        tabData: {
          iconName: 'graph',
          title: 'Gráfico',
        },
      } as HeaderOptions,
      user: {} as User,
      ready: false,
      examSearch: '',
      selectedExamIndex: -1,
      showDocument: false,
    };
  },
  computed: {
    exams() {
      return this.user.examSolicitations.filter(exam => exam.examResult);
    },
    examNames() {
      return this.exams
        .map(exam => exam.exam.name)
        .reduce((acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]), [] as string[]);
    },
    filteredExams() {
      return this.exams.filter(
        exam => exam.exam.name.toLowerCase() == this.examSearch.toLowerCase()
      );
    },
    selectedExam() {
      return (
        this.filteredExams.find(exam => exam.examResult!.id == this.selectedExamIndex) ??
        ({} as ExamSolicitation)
      );
    },
    selectedExamDocument() {
      if (!this.selectedExam.examResult?.document) {
        return undefined;
      }

      return {
        data: this.selectedExam.examResult!.document,
        name: 'Documento',
        type: this.selectedExam.examResult!.document.startsWith('data:application/pdf')
          ? 'pdf'
          : 'image',
      } as FilePreviewType;
    },
    currentExamMeasureUnit() {
      return this.filteredExams.at(0)?.exam.measureUnit;
    },
  },
  methods: {
    toggleShowDocument() {
      this.showDocument = !this.showDocument;
    },
    formatDate(dateString: string) {
      return formatDate(dateString);
    },
    async fetchUser() {
      const { id } = this.$route.params;
      this.user = (await api.user.get(Number(id))).data;
    },
  },

  mounted() {
    this.fetchUser().then(() => {
      this.ready = true;
    });
  },
});
</script>
