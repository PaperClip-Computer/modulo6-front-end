<template>
  <Base :headerOptions="headerOptions" v-if="ready">
    <div class="flex flex-col items-center p-8 gap-8">
      <div class="rounded-2xl bg-our-red-light p-1.5">
        <img :src="doctor.icon" alt="" class="rounded-xl w-[100px]" />
      </div>
      <div
        class="flex flex-col gap-5 items-center w-full bg-our-grey-very-light rounded-xl border-2 p-2 border-our-grey-medium-medium font-roboto font-bold text-our-grey-kinda-dark"
      >
        <span class="text-2xl">Dr(a). {{ doctor.name }}</span>
        <span class="text-xl">Especialista em: {{ doctor.speciality }}</span>
        <span class="text-base pt-4 text-our-grey-kinda-dark-transparent"
          >CRM: {{ doctor.crm }}</span
        >
      </div>
    </div>
  </Base>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../api';
import { Doctor } from '../../types/api/doctor';
import { HeaderOptions } from '../../types/user';
import Base from '../common/Base.vue';

export default defineComponent({
  components: {
    Base,
  },
  data() {
    return {
      doctor: {} as Doctor,
      headerOptions: {
        hasGoBack: true,
        tabData: {
          iconName: 'stethoscope',
          title: 'Meu Doutor',
        },
      } as HeaderOptions,
      ready: false,
    };
  },
  methods: {
    async fetchDoctor() {
      const { id } = this.$route.params;
      const user = (await api.user.get(Number(id))).data;
      this.doctor = user.doctor;
    },
  },
  mounted() {
    this.fetchDoctor().then(() => {
      this.ready = true;
    });
  },
});
</script>
