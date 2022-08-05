<template>
  <Header :has-go-back="true" />
  <div class="flex justify-center my-3">
    <img
      class="rounded-lg border-4 border-our-red-light"
      src="@/assets/user.png"
      alt=""
      width="100"
      height="100"
    />
  </div>
  <div>
    <InfoList
      class="rounded-xl border-2 mx-4"
      itemClass="gap-4 bg-our-grey-very-light py-2 px-4 font-semibold text-our-grey-kinda-dark text-lg"
      :superior="{
        name: user.name,
        age: calcAge(user.nasc),
      }"
      :list="{
        'Data de Nascimento:': formatDate(user.nasc),
        'Tipo Sanguíneo:': user.tipo_sang,
        'Sexo Biológico:': user.sex,
        'Alergias:': user.alergies,
        'Remédios Controlados:': user.medicines,
        'Histórico Médico:': user.medical_history,
      }"
      :inferior="user.cpf"
    />
  </div>
  <div class="flex flex-col gap-y-2 px-4 pt-4">
    <Button :style="'hollow'" class="py-2" @click.prevent="handleButton('graph')">
      Ver Gráfico
    </Button>
    <Button :style="'hollow'" class="py-2" @click.prevent="handleButton('exams')">
      Ver Exames
    </Button>
    <Button class="py-2" @click.prevent="handleButton('order')">Pedir Exame</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../../../components/buttons/Button.vue';
import Header from '../../../components/header/Header.vue';
import InfoList from '../../../components/list/InfoList.vue';
import { formatDate } from '../../../utils/date';

export default defineComponent({
  components: {
    Button,
    InfoList,
    Header,
  },
  data() {
    return {
      user: {
        name: 'Jorge Almeida Júnior',
        cpf: '000.000.000-00',
        nasc: new Date('1953-03-10'),
        tipo_sang: 'B-',
        sex: 'M',
        alergies: 'Mínduim e Frutos do Mar',
        medicines: 'Nenhum',
        medical_history: 'Nenhum',
      },
    };
  },
  methods: {
    formatDate(date: string | Date) {
      if (typeof date == 'string') {
        return formatDate(date);
      }

      const month = date.getMonth() + 1;
      const day = date.getDate();

      return formatDate(
        [date.getFullYear(), (month < 10 ? '0' : '') + month, (day < 10 ? '0' : '') + day].join('-')
      );
    },
    calcAge(date: Date) {
      const age_dt = new Date(Date.now() - date.valueOf());
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },
    handleButton(route: string) {
      switch (route) {
        case 'graph':
          this.$router.push({
            name: 'doctor.pacient.info.graph',
          });
          break;
        case 'exams':
          this.$router.push({
            name: 'doctor.pacient.info.exam.list',
          });
          break;
        case 'order':
          this.$router.push({
            name: 'doctor.exam.info.order',
            params: {
              examId: 1,
            },
          });
          break;
      }
    },
  },
});
</script>
