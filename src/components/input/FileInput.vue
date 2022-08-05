<template>
  <label
    ref="label"
    for="inputFile"
    class="w-full rounded-xl border-2"
    :class="{ 'border-dashed': !file.data }"
  >
    <div v-if="!file.data" class="flex flex-col items-center p-5">
      <div>
        <img src="@/assets/icons/upload.svg" alt="" />
      </div>
      <span class="font-roboto font-bold text-our-grey-kinda-dark text-2xl">
        Adicione seu Exame
      </span>
    </div>
    <FilePreview v-else :file="file" />
    <Field
      id="inputFile"
      :name="name"
      type="file"
      class="hidden"
      accept="image/*,.pdf"
      v-model="rawFile"
    />
  </label>
</template>

<script lang="ts">
import * as pdfjsLib from 'pdfjs-dist';
import { Field } from 'vee-validate';
import { defineComponent } from 'vue';
import { FilePreview as FilePreviewType } from '../../types/input';
import FilePreview from './FilePreview.vue';

export default defineComponent({
  components: {
    Field,
    FilePreview,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      file: {
        type: '' as 'pdf' | 'image',
        data: undefined,
        name: '',
      } as FilePreviewType,
      rawFile: undefined as File | undefined,
    };
  },
  methods: {
    loadFile(file: File) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;

        this.file.type = result.startsWith('data:application/pdf') ? 'pdf' : 'image';
        this.file.data = result;

        await this.$nextTick();

        const label = this.$refs.label as HTMLLabelElement;

        if (this.file.type == 'image') {
          const image = document.getElementById('inputPreviewImage') as HTMLImageElement;
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
      this.file.name = file.name;
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      '../../../../node_modules/pdfjs-dist/build/pdf.worker.js';
  },
  watch: {
    rawFile(newVal: File | undefined) {
      if (!newVal) {
        return;
      }
      this.loadFile(newVal);
    },
  },
});
</script>

<style scoped></style>
