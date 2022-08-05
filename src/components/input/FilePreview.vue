<template>
  <div class="flex flex-col items-center">
    <div v-if="file.type == 'pdf'">
      <a v-if="download" :href="file.data" :download="file.name">
        <canvas
          id="inputPreviewCanvas"
          class="rounded-xl rounded-b-none"
          :class="{ 'rounded-t-none': !roundedTop }"
        />
      </a>
      <canvas
        v-else
        id="inputPreviewCanvas"
        class="rounded-xl rounded-b-none"
        :class="{ 'rounded-t-none': !roundedTop }"
      />
    </div>
    <div v-else>
      <a v-if="download" :href="file.data" :download="file.name">
        <img
          id="inputPreviewImage"
          class="rounded-xl rounded-b-none h-[100px]"
          :class="{ 'rounded-t-none': !roundedTop }"
          style="object-fit: cover"
          :src="file.data"
        />
      </a>
      <img
        v-else
        id="inputPreviewImage"
        class="rounded-xl rounded-b-none h-[100px]"
        :class="{ 'rounded-t-none': !roundedTop }"
        style="object-fit: cover"
        :src="file.data"
      />
    </div>
    <div
      class="flex flex-row justify-start self-start items-center w-full border-t-2 px-5 py-3 bg-our-grey-very-light rounded-xl rounded-t-none"
      :class="{ 'rounded-b-none': !roundedBottom }"
    >
      <img :src="`/src/assets/icons/${file.type}-48.png`" alt="" height="24" width="24" />
      <span class="font-roboto font-semibold text-our-grey-kinda-dark text-ellipsis">{{
        file.name
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FilePreview } from '../../types/input';

export default defineComponent({
  props: {
    file: {
      type: Object as PropType<FilePreview>,
      required: true,
    },
    download: {
      type: Boolean,
      default: false,
    },
    roundedTop: {
      type: Boolean,
      default: true,
    },
    roundedBottom: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style scoped></style>
