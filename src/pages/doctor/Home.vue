<template>
  <div class="bg-our-red-light flex flex-col items-center grow h-full">
    <div class="flex items-center justify-center p-8 self-stretch">
      <span class="text-white font-bold text-5xl">FitSys</span>
    </div>

    <div
      class="w-full relative bg-transparent flex flex-col px-8 py-20 items-center grow oval-shape"
    >
      <div class="flex flex-col grow justify-between items-stretch self-stretch z-10">
        <div class="flex flex-col items-center">
          <div class="pb-8">
            <img src="@/assets/icons/health-and-fitness.svg" alt="" width="100" height="100" />
          </div>
          <div class="flex flex-col gap-2 text-our-red-light text-center text-5xl font-semibold">
            <span> Bem vindo(a), </span>
            <span> Dr(a). {{ doctor.lastname }} </span>
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <FilledButtonVue
            class="self-stretch"
            text="Ver pacientes"
            @click.prevent="handleLookPacients()"
          />
          <FilledButtonVue
            class="self-stretch"
            text="Ver exames"
            @click.prevent="handleLookExams()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import FilledButtonVue from '../../components/buttons/FilledButton.vue';

  export default defineComponent({
    components: {
      FilledButtonVue,
    },
    data() {
      return {
        doctor: {
          firstname: 'André',
          lastname: 'Melo',
        },
      };
    },
    methods: {
      handleLookPacients() {
        console.log('Ver pacientes');
        this.$router.push({
          name: 'doctor.search',
        });
      },
      handleLookExams() {
        console.log('Ver exames');
      },
    },
  });
</script>

<style scoped>
  .oval-shape::before {
    position: absolute;
    top: 0;
    content: '';
    width: 100%;
    height: 40%;
    border-radius: 100% 100% 0 0;
    background-color: #fff;
  }

  .oval-shape::after {
    position: absolute;
    bottom: 0;
    content: '';
    height: calc(60% + 1px);
    width: 100%;
    background-color: #fff;
  }
</style>
