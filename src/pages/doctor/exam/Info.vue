<template>
  <div class="flex flex-col" v-if="ready">
    <Header :has-go-back="true" />
    <div class="flex flex-col p-3 border border-our-grey-medium-medium">
      <span class="text-our-grey-kinda-dark font-medium text-3xl">Nome do Exame</span>
    </div>
    <div class="p-5 flex flex-col gap-4">
      <div v-for="(value, name, i) in examInfo" :key="i">
        <PillItem :name="name" :value="value" :justify="name === 'Interpretação'" />
      </div>
    </div>
    <div class="sticky bottom-4 flex">
      <Button class="w-full shadow-md m-5" @click.prevent="handleOrderExam()"> Pedir Exame </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../../api';
import Button from '../../../components/buttons/Button.vue';
import Header from '../../../components/header/Header.vue';
import PillItem from '../../../components/pillItem/PillItem.vue';
import { Exam, ExamInfoFields } from '../../../types/api/exam';
import { infoFieldsTranslator } from '../../../utils/exam';

export default defineComponent({
  components: {
    Header,
    PillItem,
    Button,
  },
  data() {
    return {
      exam: {} as Exam,
      ready: false,
    };
  },
  computed: {
    examInfo() {
      return Object.entries(infoFieldsTranslator).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [value]: this.exam[key as ExamInfoFields] ?? '-',
        };
      }, {} as Record<string, string>);
    },
  },
  methods: {
    handleOrderExam() {
      console.log('Pedir exame');
      this.$router.push({
        name: 'doctor.exam.info.order',
      });
    },
    async fetchExam() {
      try {
        const { examId } = this.$route.params;
        this.exam = (await api.exam.exam.get(examId as string)).data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchExam().then(() => {
      this.ready = true;
      console.log(this.exam);
    });
  },
});
</script>
