<template>
  <HeaderVue />
  <div class="flex flex-col self-strech p-4">
    <SearchBarWithSelectorVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderVue from '../../components/header/Header.vue';
import SearchBarWithSelectorVue from '../../components/searchBar/SearchBarWithSelector.vue';

export default defineComponent({
  components: {
    SearchBarWithSelectorVue,
    HeaderVue,
  },
});
</script>
