<template>
  <div
    class="bg-our-grey-very-light flex flex-col items-center justify-center rounded-lg outline outline-1 outline-our-grey-medium-medium"
  >
    <div class="flex p-4">
      <SearchBarVue v-model="value" />
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
import SearchBarVue from './SearchBar.vue';
import UnderlineButtonVue from './UnderlineButton.vue';

export default defineComponent({
  components: {
    UnderlineButtonVue,
    SearchBarVue,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      buttonSelected: 'pacient',
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    handleSelectedButton(name: string) {
      this.buttonSelected = name;
    },
  },
});
</script>

<style scoped></style>
