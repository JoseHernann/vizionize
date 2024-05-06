<template>
  <VLoaderWholePage v-if="isLoading" class="w-full mt-[25%]" :color="'#0007AEF0'" />
  <div class="flex items-center justify-center w-full h-full p-20 flex-col gap-10" v-else>
    <div class="w-full justify-center flex gap-10">
      <button
        class="bg-primary px-16 text-white py-3 rounded-xl -mt-10 flex justify-around gap-2 disabled:cursor-not-allowed"
        @click="uploadImage"
      >
        <MagnifyingGlassIcon class="w-4 h-4 stroke-white" /> Buscar
      </button>
      <button
        class="bg-primary px-20 text-white py-3 rounded-xl -mt-10"
        v-if="imageSource"
        @click="deleteImage"
      >
        Eliminar imagen
      </button>
    </div>
    <div
      id="dropzone-external"
      class="p-20 flex flex-col items-center justify-center w-full h-[30rem] border-2 border-primary border-dashed rounded-lg cursor-pointer bg-white transition-colors hover:bg-silver-50"
      @dragover.prevent
      @dragenter.prevent
      @dragleave.prevent
      @drop.prevent="handleDrop"
      @click="openFileExplorer"
      :class="{ 'border-blue-500 border-4': isDropZoneActive }"
    >
      <img
        id="dropzone-image"
        :src="imageSource"
        v-if="imageSource"
        alt=""
        class="max-h-96 max-w-96"
      />

      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <CloudArrowUpIcon
          class="w-8 h-8 mb-4 text-primary dark:text-silver-400"
          id="dropzone-image"
          v-if="!imageSource"
        />

        <p class="mb-2 text-sm text-primary" id="dropzone-text" v-if="textVisible">
          <span class="font-semibold">Click para Subir</span> o arrastra y suelta tu archivo
        </p>
        <p class="text-xs text-primary" id="dropzone-text" v-if="textVisible">
          SVG, PNG, JPG o GIF (MAX. 800x400px)
        </p>
      </div>
    </div>
  </div>
  <input
    id="file-uploader"
    type="file"
    accept="image/png, image/jpeg, image/jpg"
    @change="handleFileUpload"
    style="display: none"
  />
</template>

<script setup lang="ts">
  import { CloudArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
  import { ref } from 'vue';
  import analyzeImage from '../services/computerVisionAPI.ts';
  import VLoaderWholePage from './VLoaderWholePage.vue';
  import { showLargeErrorToast, showSmallErrorToast } from '../utils/alerts.ts';

  const isDropZoneActive = ref(false);
  const imageSource = ref('');
  const textVisible = ref(true);
  const File = ref();
  const isLoading = ref(false);

  const emit = defineEmits(['productDetected', 'imageSource']);

  async function uploadImage() {
    if (imageSource.value == '') {
      await showSmallErrorToast('Debes cargar una imagen primero');
      return;
    }

    isLoading.value = true;
    const a = await analyzeImage(File.value);
    const producto = a.predictions.filter((item: any) => item.probability > 0.8);

    if (producto.length == 0) {
      await showSmallErrorToast('Producto No encontrado');
      isLoading.value = false;
      return;
    }
    emit('productDetected', producto[0].tagName);
    emit('imageSource', imageSource.value);
    isLoading.value = false;
  }

  function deleteImage() {
    imageSource.value = '';
    textVisible.value = true;
    File.value = null;
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    isDropZoneActive.value = false;
    textVisible.value = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      handleFile(target.files[0]);
    }
  }

  function handleFile(file: File) {
    textVisible.value = false;
    if (!file.type.startsWith('image/')) {
      showLargeErrorToast('Solo se permiten archivos de imagen.');
      return;
    }
    const reader = new FileReader();
    File.value = file;
    reader.onload = () => {
      imageSource.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function openFileExplorer() {
    const fileUploader = document.getElementById('file-uploader') as HTMLInputElement;
    fileUploader.click();
  }
</script>

<style scoped></style>
