<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  const tab = ref(1);
  import { DxLookup } from 'devextreme-vue/lookup';
  import JsonRequestOptions from '../../entities/jsonRequest.ts';
  import getDinamicData from '../../services/requestFunction.ts';
  import DropZone from '../../components/dropZone.vue';
  import { CurrencyDollarIcon, InboxStackIcon } from '@heroicons/vue/24/outline';
  const suppliersData = ref([]);
  const categorysData = ref([]);

  async function getSuppliers() {
    const catalogOptions: JsonRequestOptions = {
      encryptedSP: 'X_XpW/ylNbYw4XEFGm0gXGrGw==',
      paramValues: [
        {
          name: 'Type',
          value: 1,
          type: 'int',
        },
      ],
    };
    suppliersData.value = await getDinamicData(catalogOptions);
  }

  async function getCategorys() {
    const catalogOptions: JsonRequestOptions = {
      encryptedSP: 'X_XpW/ylNbYw4XEFGm0gXGrGw==',
      paramValues: [
        {
          name: 'Type',
          value: 2,
          type: 'int',
        },
      ],
    };
    categorysData.value = await getDinamicData(catalogOptions);
  }

  onMounted(async () => {
    await getSuppliers();
    await getCategorys();
  });
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
      <div class="h-96">
        <DropZone :show-search="false" />
      </div>
      <div class="flex flex-col p-14 gap-5">
        <div class="grid grid-cols-3 gap-5">
          <label
            class="col-start-1 col-end-3 block overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span class="text-md font-medium text-silver-700"> Nombre del producto </span>
            <input
              type="text"
              class="mt-3 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
          </label>
          <label
            class="w-full flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <InboxStackIcon class="w-6 h-6 stroke-primary" />
            <span>
              <span class="text-md font-medium text-silver-700"> Cantidad (Stock) </span>
              <input
                type="number"
                class="mt-3 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
            </span>
          </label>
        </div>
        <div class="flex w-full gap-5">
          <label
            class="w-full flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <CurrencyDollarIcon class="w-7 h-7 stroke-primary" />
            <span class="w-full">
              <span class="text-md font-medium text-silver-700"> Precio unitario </span>
              <input
                type="number"
                class="mt-3 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
            </span>
          </label>

          <label
            class="w-full flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <CurrencyDollarIcon class="w-7 h-7 stroke-primary" />
            <span class="w-full">
              <span class="text-md font-medium text-silver-700"> Precio Venta </span>
              <input
                type="number"
                class="mt-3 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
            </span>
          </label>
        </div>
        <div class="flex gap-5">
          <div class="flex flex-col w-full gap-3">
            <label class="text-silver-400"> Proveedor </label>
            <DxLookup
              :items="suppliersData"
              placeholder="Selecciona un proveedor..."
              display-expr="NOMBRE"
              class="w-full"
            />
          </div>
          <div class="flex flex-col w-full gap-3">
            <label class="text-silver-400">Categoria</label>
            <DxLookup
              :items="categorysData"
              placeholder="Selecciona una categoria..."
              display-expr="CATEGORIA"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex w-full justify-center mt-14">
          <button class="bg-clear px-20 text-white py-3 rounded-xl -mt-10">Guardar</button>
        </div>
      </div>
    </div>
    <div v-if="tab == 1" class="w-full">
      <DropZone :show-search="true" />
    </div>
  </div>
</template>

<style scoped></style>
