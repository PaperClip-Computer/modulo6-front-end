<template>
  <div class="flex flex-col">
    <Header :has-go-back="true" />
    <div class="flex flex-col p-5 gap-y-3">
      <span class="text-our-grey-kinda-dark font-semibold text-xl">Exame</span>
      <input
        placeholder="Insira o nome do exame"
        class="rounded-lg placeholder:text-our-grey-medium-medium text-our-grey-kinda-dark text-xl font-medium bg-our-grey-very-light outline-none p-3"
      />
      <span class="text-our-grey-kinda-dark font-semibold text-xl">Paciente</span>
      <input
        placeholder="XXX.XXX.XXX-XX"
        v-maska="'###.###.###-##'"
        class="rounded-lg placeholder:text-our-grey-medium-medium text-our-grey-kinda-dark text-xl font-medium bg-our-grey-very-light outline-none p-3"
      />
    </div>
    <div
      v-if="selectedPacient"
      class="flex flex-row items-center justify-center gap-x-3 border m-5"
    >
      <div class="flex rounded-lg border border-5 border-our-red-light">
        <img class="rounded-lg" src="@/assets/user.png" alt="" width="64" height="64" />
      </div>
      <div class="flex flex-col gap-y-2">
        <span class="text-our-grey-kinda-dark font-medium text-2xl">Jorge Almeida Júnior</span>
        <span class="text-our-grey-kinda-dark font-medium text-xl">000.000.000-00</span>
        <span class="text-our-grey-kinda-dark font-medium text-xl">10/03/1953</span>
      </div>
    </div>
    <div class="p-5 absolute bottom-0 w-full">
      <FilledButton class="w-full" text="Confirmar" @click.prevent="handleSubmitOrderExam()" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FilledButton from '../../../components/buttons/FilledButton.vue';
import Header from '../../../components/header/Header.vue';

let selectedPacient = true;

export default defineComponent({
  components: {
    FilledButton,
    Header,
  },
  data() {
    return { selectedPacient };
  },
  methods: {
    handleSubmitOrderExam() {
      console.log('Confirmado');
    },
  },
});
</script>
