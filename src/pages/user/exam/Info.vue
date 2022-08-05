<template>
  <Base :headerOptions="headerOptions" :title="examData.name" :hasTitleButton="false">
    <div class="flex flex-col p-4">
      <div class="flex flex-col items-stretch gap-4 pb-12">
        <PillItem
          v-for="(text, name, i) in examData.info"
          :key="i"
          :name="name"
          :value="text"
          :justify="true"
        />
      </div>
      <div class="sticky bottom-4 flex">
        <Button class="w-full shadow-md" @click="handleRegisterResult">
          Registrar Resultado
        </Button>
      </div>
    </div>
  </Base>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../../../components/buttons/Button.vue';
import PillItem from '../../../components/pillItem/PillItem.vue';
import { Exam } from '../../../types/exam';
import { HeaderOptions } from '../../../types/user';
import Base from '../../common/Base.vue';

export default defineComponent({
  components: {
    Base,
    PillItem,
    Button,
  },
  props: {
    // examData: {
    //   type: Object as PropType<Exam>,
    //   required: true,
    // },
  },
  data() {
    return {
      headerOptions: {
        hasGoBack: true,
      } as HeaderOptions,
      examData: {
        id: 0,
        name: 'Tiroglobulina',
        info: {
          Sinonímia: undefined,
          'Preparo do Paciente': 'Jejum de 4 horas',
          'Valores Normais': '2 a 30 ng/dL',
          Interpretação:
            'A tiroglobulina é uma glicoproteína produzida pelas células acinares tiroidianas sendo o principal componente do colóide dos folículos tiroidianos. Os seus níveis séricos variam com o estado funcional da tiróide, estando elevados nas tireoidites, carcinomas de tiróide, hipertiroidismo ou mesmo ap6s palpação vigorosa dessa glândula. Sua principal utilidade é no seguimento de carcinomas operados da tiróide, especialmente dos tipos papilífero, folicular e misto papilífero-folicutar.',
        },
        unitMeasure: 'ng/dL',
      } as Exam,
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
