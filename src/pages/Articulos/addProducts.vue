<script setup lang="ts">
  import { ref } from 'vue';

  const tab = ref(1);
</script>

<template>
  <div class="h-full w-full">
    <div class="flex w-full justify-center ">
      <div class="flex px-2 py-2 w-fit rounded-xl bg-silver-100  gap-5 text-sm   ">
        <button :class=" {'bg-silver-50': tab == 1 , 'p-2 rounded-lg transition-colors' : true}"  @click="tab = 1">Drag & Drop</button>
        <button :class=" {'bg-silver-50': tab == 2 , 'p-2 rounded-lg transition-colors' : true}"  @click="tab = 2">Manual</button>
      </div>
    </div>
    <div v-if="tab == 2"></div>
    <div v-if="tab == 1" class=" w-full ">
      <div class="flex items-center justify-center w-full h-full p-20">
        <label
          for="dropzone-file"
          class=" p-20 flex flex-col items-center justify-center w-full h-full border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-primary dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-primary">
              <span class="font-semibold">Click para Subir</span> o  arrastra y suelta tu archivo
            </p>
            <p class="text-xs text-primary">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
