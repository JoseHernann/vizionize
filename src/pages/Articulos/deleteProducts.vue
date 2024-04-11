<script setup lang="ts">
  import { ref } from 'vue';
  import { DxFileUploader } from 'devextreme-vue/file-uploader';
  import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/vue/24/outline';
  const tab = ref(1);

  const isDropZoneActive = ref(false);
  const imageSource = ref('');
  const textVisible = ref(true);
  const allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png'];

  function onDropZoneEnter(e) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      isDropZoneActive.value = true;
    }
  }
  function onDropZoneLeave(e) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      isDropZoneActive.value = false;
    }
  }
  function onUploaded({ file }) {
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
</script>

<template>
  <div class="h-full w-full">
    <div class="flex w-full justify-center">
      <div class="flex px-1 py-1 w-fit rounded-md bg-silver-100 gap-2 text-sm">
        <button
          :class="{
            'bg-white text-silver-900 font-semibold': tab == 1,
            'px-12 py-1 rounded-md transition-colors text-silver-500 ': true,
          }"
          @click="tab = 1"
        >
          Drag & Drop
        </button>
        <button
          :class="{
            'bg-white text-silver-900 font-semibold': tab == 2,
            'px-12 py-1 rounded-md transition-colors text-silver-500': true,
          }"
          @click="tab = 2"
        >
          Manual
        </button>
      </div>
    </div>
    <div v-if="tab == 2"></div>
    <div v-if="tab == 1" class="w-full">
      <div class="flex items-center justify-center w-full h-full p-20">
        <div
          id="dropzone-external"
          class="p-20 py-56 flex flex-col items-center justify-center w-full h-full border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-silver-50"
        >
          <XMarkIcon
            class="w-6 h-6 bg-primary stroke-white rounded-full self-end"
            v-if="imageSource"
            @click="deleteImage"
          />
          <img id="dropzone-image" :src="imageSource" v-if="imageSource" alt="" />
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudArrowUpIcon
              class="w-8 h-8 mb-4 text-primary dark:text-gray-400"
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
    </div>
  </div>
</template>

<style scoped></style>
