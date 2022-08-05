<template>
  <div class="flex flex-col">
    <Header v-bind="headerOptions" />
    <div class="p-4 flex flex-col">
      <span class="text-3xl font-bold pb-4 text-our-grey-kinda-dark">Gráfico</span>
      <SearchBar v-model="examSearch" placeholder="Insira o nome do exame" />
      <span class="text-our-grey-kinda-dark pt-2">
        Unidade de medida: <span class="font-bold"> ng/dL </span>
      </span>
    </div>
    <div class="flex flex-col gap-4 pb-4">
      <Graph :exams="exams" v-model="selectedExamIndex" class="border-b-2 border-t-2" />
      <div class="flex flex-col">
        <InfoList
          class="rounded-xl border-2 mx-4 rounded-b-none border-b-0"
          itemClass="gap-4 bg-our-grey-very-light p-4 font-semibold text-our-grey-kinda-dark text-lg"
          :list="{
            'Data de Liberação do Resultado:': selectedExam.releasedDate ?? '-',
            'Data de Realização do Exame:': selectedExam.measureDate ?? '-',
            'Resultado:': selectedExam.result
              ? `${selectedExam.result} ${selectedExam.unitMeasure}`
              : '-',
          }"
        />
        <Button
          class="mx-4 rounded-xl py-2 rounded-t-none"
          :class="{ 'rounded-b-none': showDocument }"
          :disabled="!selectedExam.result"
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
            v-if="showDocument"
            :file="selectedExam.document!"
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
import Button from '../../components/buttons/Button.vue';
import Graph from '../../components/graph/Graph.vue';
import Header from '../../components/header/Header.vue';
import FilePreview from '../../components/input/FilePreview.vue';
import InfoList from '../../components/list/InfoList.vue';
import SearchBar from '../../components/searchBar/SearchBar.vue';
import { ExamResult } from '../../types/exam';
import { HeaderOptions } from '../../types/user';
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
      examSearch: '',
      exams: [
        {
          id: 0,
          measureDate: '2021-10-10',
          releasedDate: '2021-10-24',
          result: 30,
          document: {
            name: 'Imagem bonita.jpeg',
            type: 'image',
            data: 'https://www.zetra.com.br/wp-content/uploads/2021/01/placeholder.png',
          },
          unitMeasure: 'ng/dL',
          name: 'Tirogublina',
          info: {},
        },
        {
          id: 1,
          measureDate: '2021-10-30',
          releasedDate: '2021-10-24',
          result: 10,
          document: {
            name: 'Imagem bonita.jpeg',
            type: 'image',
            data: 'https://www.zetra.com.br/wp-content/uploads/2021/01/placeholder.png',
          },
          unitMeasure: 'ng/dL',
          name: 'Tirogublina',
          info: {},
        },
        {
          id: 2,
          measureDate: '2021-10-25',
          releasedDate: '2021-10-24',
          result: 80,
          document: {
            name: 'Imagem bonita.jpeg',
            type: 'image',
            data: 'https://www.zetra.com.br/wp-content/uploads/2021/01/placeholder.png',
          },
          unitMeasure: 'ng/dL',
          name: 'Tirogublina',
          info: {},
        },
        {
          id: 3,
          measureDate: '2021-10-13',
          releasedDate: '2021-10-24',
          result: 50,
          document: {
            name: 'Imagem bonita.jpeg',
            type: 'image',
            data: 'https://www.zetra.com.br/wp-content/uploads/2021/01/placeholder.png',
          },
          name: 'Tirogublina',
          info: {},
        },
        {
          id: 4,
          measureDate: '2021-10-21',
          releasedDate: '2021-10-24',
          result: 5,
          document: {
            name: 'Imagem bonita.jpeg',
            type: 'image',
            data: 'https://www.zetra.com.br/wp-content/uploads/2021/01/placeholder.png',
          },
          name: 'Tirogublina',
          info: {},
        },
        {
          id: 5,
          measureDate: '2021-10-04',
          releasedDate: '2021-10-24',
          result: 30,
          document: {
            name: 'Imagem bonita.jpeg',
            type: 'image',
            data: 'https://www.zetra.com.br/wp-content/uploads/2021/01/placeholder.png',
          },
          name: 'Tirogublina',
          info: {},
        },
      ] as ExamResult[],
      selectedExamIndex: -1,
      showDocument: false,
    };
  },
  computed: {
    selectedExam() {
      return (
        this.exams.find(exam => exam.id == this.selectedExamIndex) ?? ({} as Partial<ExamResult>)
      );
    },
  },
  methods: {
    toggleShowDocument() {
      this.showDocument = !this.showDocument;
    },
  },
  mounted() {},
});
</script>
