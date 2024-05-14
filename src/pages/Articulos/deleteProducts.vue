<script setup lang="ts">
import {ref, watch} from 'vue';
  import { DxLookup } from 'devextreme-vue/lookup';
  import JsonRequestOptions from '../../entities/jsonRequest.ts';
  import getDinamicData from '../../services/requestFunction.ts';
  import { CurrencyDollarIcon, InboxStackIcon } from '@heroicons/vue/24/outline';
  import DropZoneInput from '../../components/dropZoneInput.vue';
  import itemEspecification from '../../entities/itemEspecification.ts';
import {MagnifyingGlassIcon} from '@heroicons/vue/24/outline';
  const tab = ref(1);

  const suppliersData = ref([]);
  const categorysData = ref([]);
  const productAlreadyDetected = ref(false);
  const searchResults = ref([])
  const product = ref<itemEspecification>({
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

  async function searchProduct() {

    const productOptions: JsonRequestOptions = {
      encryptedSP: 'X_X2sh3ki2WFOrG79tgWZVBbaat/nMDH69j', //SP_SEARCH_PRODUCT
      paramValues: [
        {
          name: 'Nombre',
          value: product.value!.name,
          type: 'varchar',
        },
      ],
    };
    searchResults.value  = await getDinamicData(productOptions);
    console.log(searchResults)
  }
  watch(() => product.value.name, async (newVal) => {
    searchResults.value = [];
    if (newVal.length > 3) {
      await searchProduct();
    }
  }, { immediate: true });

  // const productSaved = await getDinamicData(productOptions);

  function loadProductInfo(productSelected: Array<any>){
    /*product.value.name = productSelected[0].PRODUCT_NAME;
    product.value.stock = productSelected[0].STOCK;
    product.value.precioUnit = productSelected[0].PRECIO_UNIT;
    product.value.precioVent = productSelected[0].PRECIO_VENTA;
    product.value.image = productSelected[0].IMAGE;
    product.value.proveedor = productSelected[0].PROVEEDOR;
    product.value.category = productSelected[0].CATEGORY;*/
    console.log(productSelected)

  }

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
      <div class="flex flex-col p-14 gap-20" v-else>
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
          <button class="bg-primary px-20 text-white py-5 rounded-xl -mt-10" >
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div v-if="tab == 2">
        <div class="m-8">
          <div class="w-full border rounded-lg p-2">
              <span class="flex items-center  text-2xl justify-center">
                <MagnifyingGlassIcon class="w-5 h-5 mr-2"/>
                <input
                    type="text"
                    v-model="product.name"
                    class="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                />
              </span>
            <div v-for="(result,idx) in searchResults" key="idx" class="flex justify-center flex-col gap-20">
              <button class=" shadow-md border border-silver-200 m-1 absolute top-56 w-1/2 p-2 rounded bg-white hover:bg-silver-50 " @click="loadProductInfo(result)">{{result.PRODUCT_NAME}}</button>
            </div>
          </div>

        </div>
    </div>
  </div>
</template>

<style scoped></style>
