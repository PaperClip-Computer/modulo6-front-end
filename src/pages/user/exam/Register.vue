<template>
  <Base
    :headerOptions="headerOptions"
    :title="exam.name"
    :hasTitleButton="false"
    class="min-h-screen"
  >
    <div class="flex flex-col px-8 py-4 justify-between grow gap-12">
      <div class="flex flex-col gap-4">
        <InputPill
          title="Resultado"
          v-model="exam.result"
          placeholder="Digite o resultado..."
          measureUnit="ng/dL"
          type="number"
        />
        <InputPill title="Data de Realização do Exame" v-model="exam.date" type="date" />
        <InputPill title="Data de Liberação do Exame" v-model="exam.releaseDate" type="date" />
        <FileInput class="mt-8" />
      </div>
      <FilledButton text="Salvar" class="w-full" />
    </div>
  </Base>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FilledButton from '../../../components/buttons/FilledButton.vue';
import FileInput from '../../../components/input/FileInput.vue';
import InputPill from '../../../components/input/InputPill.vue';
import { HeaderOptions } from '../../../types/user';
import Base from '../Base.vue';

export default defineComponent({
  components: {
    Base,
    InputPill,
    FileInput,
    FilledButton,
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
    };
  },
});
</script>
