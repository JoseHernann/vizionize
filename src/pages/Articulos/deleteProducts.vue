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
    <div v-if="tab == 2">
      <fieldset class="w-full space-y-1 text-gray-300 px-32 mt-16">
        <label for="Search" class="hidden">Search</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="button" title="search" class="p-1 focus:outline-none focus:ring">
              <svg fill="currentColor" viewBox="0 0 512 512" class="w-4 h-4 text-gray-800">
                <path
                  d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"
                ></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            class="w-full py-2 pl-10 text-sm rounded-md focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-violet-600 border border-gray-100"
          />
        </div>
      </fieldset>
    </div>
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
