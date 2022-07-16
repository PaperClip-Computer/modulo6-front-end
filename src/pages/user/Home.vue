<template>
  <HeaderVue
    :hasGoBack="true"
    :hasOptions="false"
    :tabData="{
      iconName: 'search',
      title: 'Procurar',
    }"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderVue from '../../components/Header/Header.vue';

  export default defineComponent({
    components: {
      HeaderVue,
    },
  });
</script>
