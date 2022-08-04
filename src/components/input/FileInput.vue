<template>
  <label
    ref="label"
    for="inputFile"
    class="w-full rounded-xl border-2"
    :class="{ 'border-dashed': !file }"
  >
    <div v-if="!file.data" class="flex flex-col items-center p-5">
      <div>
        <img src="@/assets/icons/upload.svg" alt="" />
      </div>
      <span class="font-roboto font-bold text-our-grey-kinda-dark text-2xl"
        >Adicione seu Exame</span
      >
    </div>
    <div v-else class="flex flex-col items-center">
      <div v-if="file.type == 'pdf'">
        <canvas id="inputPreviewCanvas" class="rounded-xl rounded-b-none" />
      </div>
      <div v-else>
        <img
          id="inputPreviewImage"
          class="rounded-xl rounded-b-none h-[100px]"
          style="object-fit: cover"
        />
      </div>
      <div
        class="flex flex-row justify-start self-start items-center w-full border-t-2 px-5 py-3 bg-our-grey-very-light"
      >
        <img :src="`/src/assets/icons/${file.type}-48.png`" alt="" height="24" width="24" />
        <span class="font-roboto font-semibold text-our-grey-kinda-dark text-ellipsis">{{
          file.name
        }}</span>
      </div>
    </div>
    <input id="inputFile" type="file" class="hidden" accept="image/*,.pdf" @change="loadFile" />
  </label>
</template>

<script lang="ts">
import * as pdfjsLib from 'pdfjs-dist';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      file: {
        type: '' as 'pdf' | 'image',
        data: null as string | null,
        name: '',
      },
    };
  },
  methods: {
    loadFile(event: Event) {
      // const [file] = (event.target as HTMLInputElement).files![0];
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;

        this.file.type = result.startsWith('data:application/pdf') ? 'pdf' : 'image';
        this.file.data = result;

        await this.$nextTick();

        const label = this.$refs.label as HTMLLabelElement;

        if (this.file.type == 'image') {
          const image = document.getElementById('inputPreviewImage') as HTMLImageElement;
          console.log(result);
          image.src = result;
          image.width = label.clientWidth;
          return;
        }

        const pdf = await pdfjsLib.getDocument(result).promise;
        const page = await pdf.getPage(1);
        const pageViewport = page.getViewport({
          scale: label.clientWidth / page.view[2],
        });

        const canvas = document.getElementById('inputPreviewCanvas') as HTMLCanvasElement;
        canvas.height = 100;
        canvas.width = label.clientWidth;

        page.render({
          canvasContext: canvas.getContext('2d')!,
          viewport: pageViewport,
        });
      };
      const file = (event.target as HTMLInputElement).files![0];
      this.file.name = file.name;
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      '../../../../node_modules/pdfjs-dist/build/pdf.worker.js';
  },
});
</script>

<style scoped></style>
