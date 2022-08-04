<template>
  <div
    class="bg-our-grey-very-light flex flex-col items-center justify-center rounded-lg outline outline-1 outline-our-grey-medium-medium"
  >
    <SearchBar
      v-model="value"
      :placeholder="
        buttonSelected === 'pacient' ? 'Digite o nome ou CPF' : 'Digite o nome do exame'
      "
    />
    <div class="flex gap-5">
      <UnderlineButton
        text="Paciente"
        @click.prevent="handleSelectedButton('pacient')"
        :active="buttonSelected === 'pacient'"
      />
      <UnderlineButton
        text="Exame"
        @click.prevent="handleSelectedButton('exam')"
        :active="buttonSelected === 'exam'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from './SearchBar.vue';
import UnderlineButton from './UnderlineButton.vue';

export default defineComponent({
  components: {
    UnderlineButton,
    SearchBar,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      buttonSelected: this.button,
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
