<template>
  <button class="rounded-xl p-1.5 bg-white active:bg-neutral-300" @click.prevent="toggleModal">
    <img src="@/assets/icons/more_vert.svg" alt="" height="24" width="24" />
  </button>

  <Transition name="fade">
    <div
      v-if="modal.active"
      class="fixed inset-0 w-full h-full bg-gray-600 transition-opacity flex flex-col items-end py-3 px-4"
      :class="{ 'bg-opacity-0': !modal.active, 'bg-opacity-50': modal.active }"
      @click.self="toggleModal"
    >
      <div class="rounded-xl bg-white p-2 flex flex-col w-max z-10" ref="modal-content">
        <button v-for="(option, i) in options" :key="i" @click="$emit('tabClicked', option)">
          <TabVue
            :iconName="option.iconName"
            :title="option.title"
            class="w-full hover:bg-neutral-100 active:bg-neutral-300"
          />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TabData } from '../../types/header';

import TabVue from './Tab.vue';

export default defineComponent({
  components: {
    TabVue,
  },
  emits: ['tabClicked'],
  data() {
    const modalClickListener: (ev: MouseEvent) => void = () => {};

    return {
      modal: {
        active: false,
        firstClick: false,
      },
      modalClickListener,
      options: [
        {
          iconName: 'search',
          title: 'Procurar',
        },
        {
          iconName: 'restore',
          title: 'Histórico',
        },
        {
          iconName: 'stethoscope',
          title: 'Meu Doutor',
        },
        {
          iconName: 'graph',
          title: 'grÁfico',
        },
      ] as TabData[],
    };
  },
  computed: {
    modalContentElement() {
      return this.$refs['modal-content'] as HTMLElement;
    },
  },
  methods: {
    toggleModal() {
      this.modal.active = !this.modal.active;
    },
  },
});
</script>

<style scoped></style>
