<template>
  <Base
    :headerOptions="headerOptions"
    :title="exam.name"
    :hasTitleButton="false"
    class="min-h-screen"
    v-if="ready"
  >
    <Form
      @submit="submit"
      class="flex flex-col px-8 py-4 justify-between grow gap-12"
      :validationSchema="schema"
      v-slot="{ meta, isSubmitting }"
    >
      <div class="flex flex-col gap-4">
        <InputPill
          title="Resultado"
          name="result"
          v-model="examResult.result"
          placeholder="Digite o resultado..."
          measureUnit="ng/dL"
          type="number"
        />
        <InputPill
          title="Data de Realização do Exame"
          name="examDate"
          v-model="examResult.measureDate"
          type="date"
        />
        <InputPill
          title="Data de Liberação do Exame"
          name="examReleaseDate"
          v-model="examResult.resultDate"
          type="date"
        />
        <FileInput class="mt-8" name="examDocument" v-model="examResult.document" />
      </div>
      <Button
        type="submit"
        class="w-full"
        :disabled="!meta.valid || !meta.dirty"
        :isLoading="isSubmitting"
      >
        Salvar
      </Button>
    </Form>
  </Base>
</template>

<script lang="ts">
import { Form } from 'vee-validate';
import { defineComponent } from 'vue';
import * as yup from 'yup';
import api from '../../../api';

import Button from '../../../components/buttons/Button.vue';
import FileInput from '../../../components/input/FileInput.vue';
import InputPill from '../../../components/input/InputPill.vue';
import { ExamResult, ExamSolicitation } from '../../../types/api/exam';
import { HeaderOptions } from '../../../types/user';
import Base from '../../common/Base.vue';

export default defineComponent({
  components: {
    Base,
    InputPill,
    FileInput,
    Button,
    Form,
  },
  data() {
    return {
      examSolicitation: {} as ExamSolicitation,
      headerOptions: {
        hasGoBack: true,
      } as HeaderOptions,
      ready: false,
      examResult: {
        result: '',
        measureDate: '',
        resultDate: '',
        document: '',
      } as Pick<ExamResult, 'result' | 'measureDate' | 'resultDate' | 'document'>,
      schema: yup.object({
        result: yup.number().required('O campo é obrigatório'),
        examDate: yup.date().required('O campo é obrigatório'),
        examReleaseDate: yup.date().required('O campo é obrigatório'),
        examDocument: yup.mixed().required('O campo é obrigatório'),
      }),
    };
  },
  computed: {
    exam() {
      return this.examSolicitation.exam;
    },
  },
  methods: {
    async submit() {
      console.log(this.examResult);

      try {
        await api.exam.examResult.post({
          document: this.examResult.document,
          measureDate: new Date(this.examResult.measureDate),
          resultDate: new Date(this.examResult.resultDate),
          result: this.examResult.result,
          examSolicitationId: this.examSolicitation.id,
        });
        this.$router.push({
          name: 'user.home',
        });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchExam() {
      const { examId } = this.$route.params;
      this.examSolicitation = (await api.exam.examSolicitation.get(Number(examId))).data;
    },
  },
  mounted() {
    this.fetchExam().then(() => {
      console.log();
      this.ready = true;
    });
  },
});
</script>
