<template>
  <Header :hasGoBack="true" />
  <div class="flex flex-col gap-6 p-4">
    <div class="flex flex-col text-our-grey-kinda-dark">
      <span class="text-3xl font-bold">{{ exam.name }}</span>
      <span>{{ exam.measureDate }}</span>
    </div>
    <div class="grid grid-cols-2 font-medium text-lg rounded-full shadow-md">
      <span
        class="flex items-center justify-start bg-our-red-light text-white rounded-full rounded-r-none py-1 px-4"
      >
        Resultado
      </span>
      <span
        class="text-right border-2 border-l-0 rounded-full rounded-l-none py-1 px-4 flex items-center justify-end"
      >
        {{ exam.result }} {{ exam.unitMeasure }}
      </span>
    </div>
    <PillItem
      v-for="(text, name, i) in exam.info"
      :key="i"
      :name="name"
      :value="text"
      :justify="true"
    />

    <FilePreview :file="exam.document" :download="true" :roundedTop="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../../components/header/Header.vue';
import FilePreview from '../../components/input/FilePreview.vue';
import PillItem from '../../components/pillItem/PillItem.vue';
import { ExamResult } from '../../types/exam';

export default defineComponent({
  components: {
    Header,
    PillItem,
    FilePreview,
  },
  data() {
    return {
      exam: {
        id: 0,
        measureDate: '2021-02-10',
        releasedDate: '2021-02-15',
        result: 20,
        unitMeasure: 'nd/dL',
        document: {
          name: 'Imagem bonita.jpeg',
          type: 'image',
          data: 'https://www.zetra.com.br/wp-content/uploads/2021/01/placeholder.png',
        },
        name: 'Tirogublina',
        info: {
          'Valores Normais': '2 a 30 ng/dL',
          Interpretação:
            'A tiroglobulina é uma glicoproteína produzida pelas células acinares tiroidianas sendo o principal componente do colóide dos folículos tiroidianos. Os seus níveis séricos variam com o estado funcional da tiróide, estando elevados nas tireoidites, carcinomas de tiróide, hipertiroidismo ou mesmo ap6s palpação vigorosa dessa glândula. Sua principal utilidade é no seguimento de carcinomas operados da tiróide, especialmente dos tipos papilífero, folicular e misto papilífero-folicutar.',
        },
      } as ExamResult,
    };
  },
});
</script>
