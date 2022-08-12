<template>
  <div v-if="ready" class="flex flex-col">
    <Header :hasGoBack="true" />
    <div class="flex flex-col p-4 gap-6">
      <div class="flex flex-col gap-2">
        <span class="text-our-grey-kinda-dark font-semibold text-2xl">Exame</span>
        <SearchBarWithAutoComplete
          v-model="examValue"
          :placeholder="'Insira o nome do exame'"
          :autoCompleteValues="examList"
          :disabled="$route.name == 'doctor.exam.info.order'"
        />
      </div>
      <div>
        <span class="text-our-grey-kinda-dark font-semibold text-2xl">Paciente</span>
        <SearchBar
          v-model="pacientValue"
          :placeholder="'Insira o CPF do paciente'"
          mask="###.###.###-##"
          :disabled="$route.name == 'doctor.pacient.info.order'"
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
        <span class="text-lg">{{ formatDate(pacient.birthDate) }}</span>
      </div>
    </div>
    <div class="p-5 absolute bottom-0 w-full">
      <Button class="w-full" @click.prevent="handleSubmitOrderExam()" :disabled="!validData()">
        Confirmar
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../../api';
import Button from '../../../components/buttons/Button.vue';
import Header from '../../../components/header/Header.vue';
import SearchBar from '../../../components/searchBar/SearchBar.vue';
import SearchBarWithAutoComplete from '../../../components/searchBar/SearchBarWithAutoComplete.vue';
import { Exam } from '../../../types/api/exam';
import { User } from '../../../types/api/user';
import { formatDate } from '../../../utils/date';

type ExamSolicitationPostParams = {
  doctorId: number;
  userId: number;
  examId: number;
};

export default defineComponent({
  components: {
    Button,
    Header,
    SearchBar,
    SearchBarWithAutoComplete,
  },
  data() {
    return {
      examList: [] as string[],
      examValue: '',
      exam: undefined as Exam | undefined,
      pacient: undefined as User | undefined,
      pacientList: [] as string[],
      pacientValue: '',
      ready: false,
    };
  },
  methods: {
    handleSubmitOrderExam() {
      this.postOrder();
    },
    validData() {
      if (
        this.$route.name == 'doctor.pacient.info.order' &&
        this.examList.includes(this.examValue)
      ) {
        return true;
      }

      if (
        this.$route.name == 'doctor.exam.info.order' &&
        this.pacientList.includes(this.pacientValue)
      ) {
        return true;
      }

      return false;
    },
    async postOrder() {
      try {
        const { doctorId } = this.$route.params;
        const examId = (await api.exam.exam.get(this.examValue)).data.id;

        if (!this.pacient) {
          return;
        }

        await api.exam.examSolicitation.post({
          doctorId: Number(doctorId as string),
          userId: this.pacient.id,
          examId: examId,
        } as ExamSolicitationPostParams);

        switch (this.$route.name) {
          case 'doctor.pacient.info.order':
            this.$router.push({
              name: 'doctor.search',
              query: {
                tab: 'pacient',
              },
            });
            return;

          case 'doctor.exam.info.order':
            this.$router.push({
              name: 'doctor.search',
              query: {
                tab: 'exam',
              },
            });
            return;
        }
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(dateString: string) {
      return formatDate(dateString);
    },
    async fetchPacient() {
      try {
        const { id } = this.$route.params;
        this.pacient = (await api.user.get(Number(id))).data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchExam() {
      try {
        const { examId } = this.$route.params;
        this.exam = (await api.exam.exam.get(examId as string)).data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchExams() {
      try {
        const exams = (await api.exam.exam.list()).data;

        exams.forEach(e => {
          this.examList.push(e.name);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPacients() {
      const { doctorId } = this.$route.params;
      const doctor = (await api.doctor.get(Number(doctorId))).data;
      this.pacientList = doctor.pacients.map(pacient => pacient.cpf);
    },
    async fetchData() {
      switch (this.$route.name) {
        case 'doctor.pacient.info.order':
          await this.fetchExams();
          await this.fetchPacient();

          this.pacientValue = this.pacient!.cpf;
          return;

        case 'doctor.exam.info.order':
          await this.fetchPacients();
          await this.fetchExam();
          console.log(this.pacient);
          console.log(this.pacientList);
          console.log(this.exam);

          this.examValue = this.exam!.name;
          return;
      }
    },
  },
  mounted() {
    this.fetchData().then(() => {
      this.ready = true;
    });
  },
  watch: {
    async pacientValue(newVal) {
      if (this.$route.name != 'doctor.exam.info.order') {
        return;
      }

      if (this.pacientList.includes(newVal)) {
        [this.pacient] = (await api.user.getByCpf(newVal)).data;
        console.log(this.pacient);
      }
    },
  },
});
</script>
