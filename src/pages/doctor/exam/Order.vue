<template>
  <div class="flex flex-col">
    <Header :hasGoBack="true" />
    <div class="flex flex-col p-4 gap-6">
      <div class="flex flex-col gap-2">
        <span class="text-our-grey-kinda-dark font-semibold text-2xl">Exame</span>
        <SearchBarWithAutoComplete
          v-model="examValue"
          :placeholder="'Insira o nome do exame'"
          :autoCompleteValues="examList"
        />
      </div>
      <div>
        <span class="text-our-grey-kinda-dark font-semibold text-2xl">Paciente</span>
        <SearchBar
          v-model="pacientValue"
          :placeholder="'Insira o CPF do paciente'"
          mask="###.###.###-##"
        />
      </div>
    </div>
    <div
      v-if="pacient"
      class="flex flex-row items-start justify-start gap-5 border-2 m-4 p-4 rounded-lg"
    >
      <div class="flex rounded-lg border-4 border-our-red-light">
        <img class="rounded-lg" src="@/assets/user.png" alt="" width="94" height="94" />
      </div>
      <div class="flex flex-col gap-1 text-our-grey-kinda-dark">
        <span class="font-medium text-2xl">{{ pacient.name }}</span>
        <span class="text-lg">{{ pacient.cpf }}</span>
        <span class="text-lg">{{ pacient.nasc }}</span>
      </div>
    </div>
    <div class="p-5 absolute bottom-0 w-full">
      <Button class="w-full" @click.prevent="handleSubmitOrderExam()"> Confirmar </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../../../components/buttons/Button.vue';
import Header from '../../../components/header/Header.vue';
import SearchBar from '../../../components/searchBar/SearchBar.vue';
import SearchBarWithAutoComplete from '../../../components/searchBar/SearchBarWithAutoComplete.vue';

export default defineComponent({
  components: {
    Button,
    Header,
    SearchBar,
    SearchBarWithAutoComplete,
  },
  data() {
    const examList = ['Tirogublina', 'T3', 'T4', 'Colesterol'];

    const pacient = {
      name: 'Jorge Almeida Júnior',
      cpf: '000.000.000-00',
      nasc: '10/03/1953',
    };

    return {
      examList,
      examValue: '',
      pacient,
      pacientValue: '',
    };
  },
  methods: {
    handleSubmitOrderExam() {
      console.log('Confirmado');
    },
  },
});
</script>
