<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  const tab = ref(1);
  import { DxLookup } from 'devextreme-vue/lookup';
  import JsonRequestOptions from '../../entities/jsonRequest.ts';
  import getDinamicData from '../../services/requestFunction.ts';
  import { CurrencyDollarIcon, InboxStackIcon } from '@heroicons/vue/24/outline';
  import DropZoneInput from '../../components/dropZoneInput.vue';
  import DropZoneDevexpress from '../../components/dropZoneDevexpress.vue';
  import { showSmallErrorToast, showSmallSuccessToast } from '../../utils/alerts.ts';

  const suppliersData = ref([]);
  const categorysData = ref([]);

  const productAlreadyDetected = ref(false);

  const product = ref<any>({
    name: '',
    stock: 0,
    precioVent: 0,
    precioUnit: 0,
    category: 0,
    proveedor: 0,
    image: '',
  });

  //TAB 1
  function handleProductDetected(producto: string) {
    product.value!.name = producto;
    productAlreadyDetected.value = true;
  }

  function handleImageSource(imageSourceRecived: string) {
    product.value!.image = imageSourceRecived;
  }

  async function saveProduct() {
    const productOptions: JsonRequestOptions = {
      encryptedSP: 'X_XvA3yAqJX6tXej8yTbZEASbqiA0eC/j2e',
      paramValues: [
        {
          name: 'Nombre',
          value: product.value!.name,
          type: 'varchar',
        },
        {
          name: 'Stock',
          value: product.value!.stock,
          type: 'int',
        },
        {
          name: 'PrecioUnit',
          value: product.value!.precioUnit,
          type: 'float',
        },
        {
          name: 'PrecioVent',
          value: product.value!.precioVent,
          type: 'float',
        },
        {
          name: 'Proveedor',
          value: product.value!.proveedor.ID_PROVEEDOR,
          type: 'int',
        },
        {
          name: 'Categoria',
          value: product.value!.category.ID_CATEGORIA,
          type: 'int',
        },
        {
          name: 'Imagen',
          value: product.value!.image,
          type: 'varchar',
        },
      ],
    };

    if (
      product.value.category == 0 ||
      product.value.stock == 0 ||
      product.value.name == '' ||
      product.value.proveedor == 0 ||
      product.value.precioUnit == 0 ||
      product.value.precioVent == 0
    ) {
      await showSmallErrorToast('Completa todos los campos');
      return;
    }
    const productSaved = await getDinamicData(productOptions);

    if (productSaved[0].result == 'Saved') {
      cancelOperation();
      await showSmallSuccessToast('Producto Guardado Correctamente');
    } else {
      await showSmallErrorToast('Este producto ya existe en tu inventario');
    }
  }

  //TAB 2
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

  function cancelOperation() {
    productAlreadyDetected.value = false;
    product.value.name = '';
    product.value.stock = 0;
    product.value.precioUnit = 0;
    product.value.precioVent = 0;
    product.value.image = '';
    product.value.proveedor = 0;
    product.value.category = 0;
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
    <div v-if="tab == 1" class="w-full">
      <DropZoneInput
        @productDetected="handleProductDetected"
        v-if="!productAlreadyDetected"
        @imageSource="handleImageSource"
      />
      <div class="flex flex-col p-14 gap-10" v-else>
        <div class="grid grid-cols-3 gap-5">
          <label
            class="col-start-1 col-end-3 block overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span class="text-md font-medium text-silver-700"> Nombre del producto </span>
            <input
              type="text"
              v-model="product!.name"
              disabled
              class="mt-3 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
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
                v-model="product.stock"
                class="mt-3 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
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

              <span class="flex items-center mt-2 text-2xl">
                <span class="text-silver-300 mr-3">$</span>
                <input
                  type="number"
                  v-model="product.precioUnit"
                  class="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                />
                <span class="text-silver-300">MXN</span>
              </span>
            </span>
          </label>

          <label
            class="w-full flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <CurrencyDollarIcon class="w-7 h-7 stroke-primary" />
            <span class="w-full">
              <span class="text-md font-medium text-silver-700"> Precio Venta </span>
              <span class="flex items-center mt-2 text-2xl">
                <span class="text-silver-300 mr-3">$</span>
                <input
                  type="number"
                  v-model="product.precioVent"
                  class="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                />
                <span class="text-silver-300">MXN</span>
              </span>
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
              v-model="product.proveedor"
            />
          </div>
          <div class="flex flex-col w-full gap-3">
            <label class="text-silver-400">Categoria</label>
            <DxLookup
              :items="categorysData"
              placeholder="Selecciona una categoria..."
              display-expr="CATEGORIA"
              v-model="product.category"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex w-full justify-center mt-14 gap-20">
          <button
            class="bg-silver-400 px-20 text-white py-5 rounded-xl -mt-10"
            @click="cancelOperation"
          >
            Cancelar
          </button>
          <button class="bg-primary px-20 text-white py-5 rounded-xl -mt-10" @click="saveProduct">
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div v-if="tab == 2">
      <div class="h-96">
        <DropZoneDevexpress :show-search="false" @imageSourceDev="handleImageSource" />
      </div>
      <div class="flex flex-col p-14 gap-5">
        <div class="grid grid-cols-3 gap-5">
          <label
            class="col-start-1 col-end-3 block overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span class="text-md font-medium text-silver-700"> Nombre del producto </span>
            <input
              type="text"
              v-model="product!.name"
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
                v-model="product.stock"
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
                v-model="product.precioUnit"
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
                v-model="product.precioVent"
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
              v-model="product.proveedor"
              class="w-full"
            />
          </div>
          <div class="flex flex-col w-full gap-3">
            <label class="text-silver-400">Categoria</label>
            <DxLookup
              :items="categorysData"
              placeholder="Selecciona una categoria..."
              display-expr="CATEGORIA"
              v-model="product.category"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex w-full justify-center mt-14 gap-10">
          <button class="bg-primary px-20 text-white py-3 rounded-xl -mt-10" @click="saveProduct">
            Guardar
          </button>
          <button
            class="bg-silver-200 px-20 text-white py-3 rounded-xl -mt-10"
            @click="cancelOperation"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
