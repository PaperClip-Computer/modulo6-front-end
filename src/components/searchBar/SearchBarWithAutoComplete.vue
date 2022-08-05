<template>
  <div class="flex flex-col relative">
    <SearchBar :placeholder="placeholder" v-model="value" />
    <Transition name="fade">
      <div
        class="absolute top-full divide-y rounded-xl bg-white z-50 w-full border-2 shadow-md"
        v-if="possibleAutoCompleteValues.length > 0"
      >
        <div
          v-for="(autoComplete, i) in possibleAutoCompleteValues"
          :key="i"
          @click="selectAutoComplete(autoComplete)"
          class="p-4"
        >
          <span class="font-roboto font-semibold text-ellipsis">{{ autoComplete }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from './SearchBar.vue';

export default defineComponent({
  components: {
    SearchBar,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder:{
      type: String,
      default: ''
    },
    autoCompleteValues: {
      type: Array<string>,
      required: true
    }
  },
  data() {
    return {
      _value: this.modelValue
    }
  },
  computed: {
    value: {
      get() {
        return this._value
      },
      set(val: string) {
        this._value = val
        this.$emit('update:modelValue', val)
      }
    },
    possibleAutoCompleteValues() {
      if (!this.value || !this.autoCompleteValues) {
        return [];
      }

      return this.autoCompleteValues.filter(text => {
        const match = text.match(new RegExp(`^${this.value}`, 'i'));
        if (!match || match[0] == match.input) {
          return false;
        }
        return true;
      });
    },
  },
  methods: {
    selectAutoComplete(val: string) {
      this.value = val;
    },
  },
});
</script>

<style scoped></style>
