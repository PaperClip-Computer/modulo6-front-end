<template>
  <div>
    <p>Header</p>
  </div>
  <div class="flex flex-col self-strech p-4">
    <SearchBarWithSelectorVue />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SearchBarWithSelectorVue from '../../components/SearchBar/SearchBarWithSelector.vue';

  export default defineComponent({
    components: {
      SearchBarWithSelectorVue,
    },
  });
</script>
