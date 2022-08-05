<template>
  <div
    class="bg-our-grey-very-light flex flex-col items-center justify-center rounded-lg outline outline-1 outline-our-grey-medium-medium"
    v-if="selectedSelector"
  >
    <SearchBar v-model="value" :placeholder="selectedSelector.placeholder" />
    <div class="flex flex-row gap-5">
      <UnderlineButton
        v-for="(selector, i) in selectors"
        :key="i"
        :text="selector.label"
        @click.prevent="$emit('update:selected', selector.value)"
        :active="selected === selector.value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Selector } from "../../types/searchBar";
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
    selected: {
      type: String,
      required: true,
    },
    selectors: {
      type: Array<Selector>,
      required: true
    },
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
    selectedSelector() {
      return this.selectors.find(selector => selector.value == this.selected)!
    }
  },
});
</script>

<style scoped></style>
