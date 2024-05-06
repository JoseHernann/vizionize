<script setup lang="ts">
  import { CloudArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
  import { DxFileUploader } from 'devextreme-vue/file-uploader';
  import { ref } from 'vue';

  const isDropZoneActive = ref(false);
  const imageSource = ref('');
  const textVisible = ref(true);
  const allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png'];

  function onDropZoneEnter(e: any) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      isDropZoneActive.value = true;
    }
  }
  function onDropZoneLeave(e: any) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      isDropZoneActive.value = false;
    }
  }
  function onUploaded({ file }: any) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      isDropZoneActive.value = false;
      imageSource.value = fileReader.result as string;
      console.log(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
    textVisible.value = false;
  }

  function onUploadStarted() {
    imageSource.value = '';
  }
  function deleteImage() {
    imageSource.value = '';
    textVisible.value = true;
  }
  function searchImage() {
    // aqui se puede hacer un handy y si no funciona la API de Azure usar la BD para buscarlo
  }

  const props = defineProps(['showSearch']);
</script>

<template>
  <div class="flex items-center justify-center w-full h-full p-20 flex-col gap-10">
    <div class="w-full justify-center flex gap-10">
      <button
        class="bg-primary px-16 text-white py-3 rounded-xl -mt-10 flex justify-around gap-2 disabled:cursor-not-allowed"
        @click="searchImage"
        v-if="props.showSearch == true"
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
      class="p-20 flex flex-col items-center justify-center w-full h-[35rem] border-2 border-primary border-dashed rounded-lg cursor-pointer bg-silver-50 hover:bg-silver-50"
    >
      <img id="dropzone-image" :src="imageSource" v-if="imageSource" alt="" />
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
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
    </div>
  </div>

  <DxFileUploader
    id="file-uploader"
    dialog-trigger="#dropzone-external"
    drop-zone="#dropzone-external"
    :multiple="false"
    :allowed-file-extensions="allowedFileExtensions"
    upload-mode="instantly"
    upload-url="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
    :visible="false"
    @drop-zone-enter="onDropZoneEnter"
    @drop-zone-leave="onDropZoneLeave"
    @uploaded="onUploaded"
    @upload-started="onUploadStarted"
  />
</template>

<style scoped></style>
