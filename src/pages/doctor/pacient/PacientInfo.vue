<template>
  <div v-if="ready" class="mb-4">
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
          name: pacient.name,
          age: pacientAge,
        }"
        :list="pacientInfo"
        :inferior="pacient.cpf"
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
  </div>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { defineComponent } from 'vue';
import api from '../../../api';
import Button from '../../../components/buttons/Button.vue';
import Header from '../../../components/header/Header.vue';
import InfoList from '../../../components/list/InfoList.vue';
import { User } from '../../../types/api/user';
import { formatDate } from '../../../utils/date';
import { bloodTypeTranslator, sexTranslator } from '../../../utils/pacient';

export default defineComponent({
  components: {
    Button,
    InfoList,
    Header,
  },
  data() {
    return {
      pacient: {} as User,
      ready: false,
    };
  },
  computed: {
    bloodType() {
      return bloodTypeTranslator[this.pacient.bloodType];
    },
    sex() {
      return sexTranslator[this.pacient.sex];
    },
    pacientAge() {
      const today = new Date();
      const birthDate = new Date(this.pacient.birthDate.replaceAll('Z', ''));

      return today.getFullYear() - birthDate.getFullYear();
    },
    pacientInfo() {
      return {
        'Data de Nascimento': formatDate(this.pacient.birthDate),
        'Tipo Sanguíneo': this.bloodType,
        'Sexo Biológico': this.sex,
        Alergias: isEmpty(this.pacient.allergies) ? 'Nenhum' : this.pacient.allergies.join(', '),
        'Remédios Controlados': isEmpty(this.pacient.medicines)
          ? 'Nenhum'
          : this.pacient.allergies.join(', '),
        'Histórico Médico': isEmpty(this.pacient.medicalHistory)
          ? 'Nenhum'
          : this.pacient.allergies.join(', '),
      };
    },
  },
  methods: {
    formatDate(date: string) {
      return formatDate(date);
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
            name: 'doctor.pacient.info.order',
          });
          break;
      }
    },
    async fetchPacient() {
      try {
        const { id } = this.$route.params;
        this.pacient = (await api.user.get(Number(id as String))).data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchPacient().then(() => {
      this.ready = true;
      console.log(this.pacient);
    });
  },
});
</script>
