<template>
  <Base :headerOptions="headerOptions" :title="examData.name" :hasTitleButton="false">
    <div class="flex flex-col p-4">
      <div class="flex flex-col items-stretch gap-4 pb-12">
        <PillItem
          v-for="(examItem, i) in examData.data"
          :key="i"
          :name="examItem.name"
          :value="examItem.text"
          :justify="true"
        />
      </div>
      <FilledButton text="Registrar Resultado" @click="handleRegisterResult" />
    </div>
  </Base>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FilledButton from '../../../components/buttons/FilledButton.vue';
import PillItem from '../../../components/pillItem/PillItem.vue';
import { UserExamData } from '../../../types/exam';
import { HeaderOptions } from '../../../types/user';
import Base from '../Base.vue';

export default defineComponent({
  components: {
    Base,
    PillItem,
    FilledButton,
  },
  props: {
    // examData: {
    //   type: Object as PropType<UserExamData>,
    //   required: true,
    // },
  },
  data() {
    return {
      headerOptions: {
        hasGoBack: true,
      } as HeaderOptions,
      examData: {
        name: 'Tiroglobulina',
        data: [
          {
            name: 'Sinonímia',
          },
          {
            name: 'Preparo do Paciente',
            text: 'Jejum de 4 horas',
          },
          {
            name: 'Valores Normais',
            text: '2 a 30 ngdL',
          },
          {
            name: 'Interpretação',
            text: 'A tiroglobulina é uma glicoproteína produzida pelas células acinares tiroidianas sendo o principal componente do colóide dos folículos tiroidianos. Os seus níveis séricos variam com o estado funcional da tiróide, estando elevados nas tireoidites, carcinomas de tiróide, hipertiroidismo ou mesmo ap6s palpação vigorosa dessa glândula. Sua principal utilidade é no seguimento de carcinomas operados da tiróide, especialmente dos tipos papilífero, folicular e misto papilífero-folicutar.',
          },
        ],
      } as UserExamData,
    };
  },
  methods: {
    handleRegisterResult() {
      this.$router.push({
        name: 'user.exam.register',
      });
    },
  },
});
</script>
