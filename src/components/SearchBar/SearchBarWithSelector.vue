<template>
  <div
    class="bg-our-grey-very-light flex flex-col items-center justify-center rounded-lg outline outline-1 outline-our-grey-medium-medium"
  >
    <div class="flex p-4">
      <SearchBarVue />
    </div>
    <div class="flex gap-5">
      <UnderlineButtonVue
        text="Paciente"
        @click.prevent="handleSelectedButton('pacient')"
        :active="buttonSelected === 'pacient'"
      />
      <UnderlineButtonVue
        text="Exame"
        @click.prevent="handleSelectedButton('exam')"
        :active="buttonSelected === 'exam'"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import UnderlineButtonVue from './UnderlineButton.vue';
  import SearchBarVue from './SearchBar.vue';

  export default defineComponent({
    components: {
      UnderlineButtonVue,
      SearchBarVue,
    },
    data() {
      return {
        buttonSelected: 'pacient',
      };
    },
    methods: {
      handleSelectedButton(name: string) {
        this.buttonSelected = name;
      },
    },
  });
</script>

<style scoped></style>
