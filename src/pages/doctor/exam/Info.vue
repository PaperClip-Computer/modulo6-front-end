<template>
  <div class="flex flex-col">
    <Header :has-go-back="true" />
    <div class="flex flex-col p-3 border border-our-grey-medium-medium">
      <span class="text-our-grey-kinda-dark font-medium text-3xl">Nome do Exame</span>
    </div>
    <div class="p-5 flex flex-col gap-4">
      <div v-for="info in infoList">
        <PillItem :name="info.name" :value="info.value" :justify="info.name === 'Interpretação'" />
      </div>
    </div>
    <div class="sticky bottom-4 flex">
      <Button class="w-full shadow-md m-5" @click.prevent="handleOrderExam()"> Pedir Exame </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../../../components/buttons/Button.vue';
import Header from '../../../components/header/Header.vue';
import PillItem from '../../../components/pillItem/PillItem.vue';

interface ExamInfo {
  name: string;
  value?: string;
}

export default defineComponent({
  components: {
    Header,
    PillItem,
    Button,
  },
  data() {
    const infoList: ExamInfo[] = [
      {
        name: 'Sinonímia',
      },
      {
        name: 'Preparo do Paciente',
        value: 'Jejum de 4 horas',
      },
      {
        name: 'Material',
        value: 'Soro. Volume mínimo: 1,0 mL',
      },
      {
        name: 'Colheita / Conservação',
        value: 'Se o exame não for realizado no mesmo dia, congelar a amostra',
      },
      { name: 'Método', value: 'Radioimunoensaio' },
      { name: 'Valores Normais', value: '2 a 30 ngdL' },
      {
        name: 'Interpretação',
        value:
          'A tiroglobulina é uma glicoproteína produzida pelas células acinares tiroidianas sendo o principal componente do colóide dos folículos tiroidianos. Os seus níveis séricos variam com o estado funcional da tiróide, estando elevados nas tireoidites, carcinomas de tiróide, hipertiroidismo ou mesmo ap6s palpação vigorosa dessa glândula. Sua principal utilidade é no seguimento de carcinomas operados da tiróide, especialmente dos tipos papilífero, folicular e misto papilífero-folicutar.',
      },
    ];

    return { infoList };
  },
  methods: {
    handleOrderExam() {
      console.log('Pedir exame');
      this.$router.push({
        name: 'doctor.exam.info.order',
      });
    },
  },
});
</script>
