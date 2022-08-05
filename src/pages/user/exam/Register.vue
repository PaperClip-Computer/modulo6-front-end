<template>
  <Base
    :headerOptions="headerOptions"
    :title="exam.name"
    :hasTitleButton="false"
    class="min-h-screen"
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
          v-model="exam.result"
          placeholder="Digite o resultado..."
          measureUnit="ng/dL"
          type="number"
        />
        <InputPill
          title="Data de Realização do Exame"
          name="examDate"
          v-model="exam.date"
          type="date"
        />
        <InputPill
          title="Data de Liberação do Exame"
          name="examReleaseDate"
          v-model="exam.releaseDate"
          type="date"
        />
        <FileInput class="mt-8" name="examDocument" />
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

import Button from '../../../components/buttons/Button.vue';
import FileInput from '../../../components/input/FileInput.vue';
import InputPill from '../../../components/input/InputPill.vue';
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
      headerOptions: {
        hasGoBack: true,
      } as HeaderOptions,
      exam: {
        name: 'Tiroglubina',
        measureUnit: 'ng/dL',
        result: '',
        date: '',
        releaseDate: '',
        document: {},
      },
      schema: yup.object({
        result: yup.number().required('O campo é obrigatório'),
        examDate: yup.date().required('O campo é obrigatório'),
        examReleaseDate: yup.date().required('O campo é obrigatório'),
        examDocument: yup.mixed().required('O campo é obrigatório'),
      }),
    };
  },
  methods: {
    submit() {
      this.$router.push({
        name: 'user.home',
      });
    },
  },
});
</script>
