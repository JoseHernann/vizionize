<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { DxLookup } from 'devextreme-vue/lookup';
  import JsonRequestOptions from '../../entities/jsonRequest.ts';
  import getDinamicData from '../../services/requestFunction.ts';
  import { CurrencyDollarIcon, InboxStackIcon } from '@heroicons/vue/24/outline';
  import DropZoneInput from '../../components/dropZoneInput.vue';
  import itemEspecification from '../../entities/itemEspecification.ts';
  import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/vue/24/outline';
  import { showSmallSuccessToast } from '../../utils/alerts.ts';
  const tab = ref(1);

  const productAlreadyDetected = ref(false);
  const searchResults = ref([]);
  const product = ref<itemEspecification>({
    name: '',
    stock: 0,
    precioVent: 0,
    precioUnit: 0,
    category: 0,
    proveedor: 0,
    image: '',
  });
  const searchedProduct = ref(false);
  const productId = ref();


  //TAB 1
  async function handleProductDetected(producto: string) {
    product.value!.name = producto;
    await searchProduct();
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
    searchResults.value = await getDinamicData(productOptions);
    console.log(searchResults);
    productId.value = searchResults.value[0].ID;
    product.value.name = searchResults.value[0].PRODUCT_NAME;
    product.value.stock = searchResults.value[0].CANTIDAD;
    product.value.precioUnit = searchResults.value[0].PRECIO_UNITARIO;
    product.value.precioVent = searchResults.value[0].PRECIO_VENTA;
    product.value.image = searchResults.value[0].IMAGEN;
  }
  watch(
    () => product.value.name,
    async (newVal) => {
      searchResults.value = [];
      if (newVal.length > 3) {
        await searchProduct();
      }
    },
    { immediate: true },
  );

  // const productSaved = await getDinamicData(productOptions);

  function loadProductInfo(productSelected: Array<any>) {
    searchedProduct.value = true;
    productId.value = productSelected.ID;
    product.value.name = productSelected.PRODUCT_NAME;
    product.value.stock = productSelected.CANTIDAD;
    product.value.precioUnit = productSelected.PRECIO_UNITARIO;
    product.value.precioVent = productSelected.PRECIO_VENTA;
    product.value.image = productSelected.IMAGEN;
    product.value.proveedor = productSelected.ID_PROVEEDOR;
    product.value.category = productSelected.ID_CATEGORIA;
  }

  function cancelOperation() {
    productAlreadyDetected.value = false;
    searchedProduct.value = false;
    product.value.name = '';
    product.value.stock = 0;
    product.value.precioUnit = 0;
    product.value.precioVent = 0;
    product.value.image = '';
    product.value.proveedor = 0;
    product.value.category = 0;
  }
  async function deleteProduct() {
    const option: JsonRequestOptions = {
      encryptedSP: 'X_Xuo2l5VKO6IOPMGEoqfBz4hcHPLvddVDe', //SP_DELETE_PRODUCT
      paramValues: [
        {
          name: 'ProductId',
          value: productId.value,
          type: 'int',
        },
      ],
    };
    const a = await getDinamicData(option);
    console.log(a);
    if (a[0].Column1 == 'OK') {
      searchedProduct.value = false;
      cancelOperation();
      await showSmallSuccessToast('Producto Eliminado');
    }
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
        <div class="flex flex-col p-14 gap-10" v-show="productAlreadyDetected">
          <div class="grid grid-cols-3 gap-5">
            <div class="flex gap-32 items-center col-start-1 col-end-3 mb-10">
              <img
                :src="product.image"
                class="max-w-72 max-h-72 border border-silver-200 rounded-xl shadow-lg"
                alt="producto"
              />
              <button
                class="bg-silver-200 h-fit p-10 rounded-xl text-white text-xl flex items-center justify-center hover:bg-silver-400 focus:ring-0 transition-colors duration-200 w-1/2"
                @click="cancelOperation"
              >
                <span class="p-2 text-2xl mt-2">Cancelar</span>
              </button>
              <button
                class="bg-red h-fit p-10 rounded-xl text-white text-xl flex items-center justify-center hover:bg-silver-400 focus:ring-0 transition-colors duration-200 w-1/2"
                @click="deleteProduct"
              >
                <TrashIcon class="w-8 mr-2" />
                <span class="p-2 text-2xl mt-2">Eliminar</span>
              </button>
            </div>
            <label
              class="bg-silver-50 col-start-1 col-end-3 block overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
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
              class="w-full bg-silver-50 flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <InboxStackIcon class="w-6 h-6 stroke-primary" />
              <span>
                <span class="text-md font-medium text-silver-700"> Cantidad (Stock) </span>
                <input
                  type="number"
                  v-model="product.stock"
                  disabled
                  class="mt-3 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                />
              </span>
            </label>
          </div>
          <div class="flex w-full gap-5">
            <label
              class="w-full bg-silver-50 flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <CurrencyDollarIcon class="w-7 h-7 stroke-primary" />
              <span class="w-full">
                <span class="text-md font-medium text-silver-700"> Precio unitario </span>

                <span class="flex items-center mt-2 text-2xl">
                  <span class="text-silver-300 mr-3">$</span>
                  <input
                    type="number"
                    disabled
                    v-model="product.precioUnit"
                    class="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                  />
                  <span class="text-silver-300">MXN</span>
                </span>
              </span>
            </label>

            <label
              class="w-full bg-silver-50 flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <CurrencyDollarIcon class="w-7 h-7 stroke-primary" />
              <span class="w-full">
                <span class="text-md font-medium text-silver-700"> Precio Venta </span>
                <span class="flex items-center mt-2 text-2xl">
                  <span class="text-silver-300 mr-3">$</span>
                  <input
                    type="number"
                    v-model="product.precioVent"
                    disabled
                    class="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                  />
                  <span class="text-silver-300">MXN</span>
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tab == 2">
      <div class="m-8">
        <div class="w-full border rounded-lg py-4 px-5">
          <span class="flex items-center text-2xl justify-center mb-3">
            <MagnifyingGlassIcon class="w-5 h-5 mr-2" />
            <input
              type="text"
              v-model="product.name"
              class="w-full border-b border-silver-200 p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
            />
          </span>

          <div
            v-for="result in searchResults"
            key="idx"
            class="flex justify-center flex-col gap-20"
          >
            <button
              class="shadow-md border border-silver-200 m-1 top-56 w-full p-2 rounded bg-white hover:bg-silver-50"
              @click="loadProductInfo(result)"
            >
              {{ result.PRODUCT_NAME }}
            </button>
          </div>
        </div>

        <div class="flex flex-col p-14 gap-10" v-show="searchedProduct">
          <div class="grid grid-cols-3 gap-5">
            <div class="flex gap-32 items-center col-start-1 col-end-3 mb-10">
              <img
                :src="product.image"
                class="max-w-72 max-h-72 border border-silver-200 rounded-xl shadow-lg"
                alt="producto"
              />
              <button
                class="bg-silver-200 h-fit p-10 rounded-xl text-white text-xl flex items-center justify-center hover:bg-silver-400 focus:ring-0 transition-colors duration-200 w-1/2"
                @click="cancelOperation"
              >
                <span class="p-2 text-2xl mt-2">Cancelar</span>
              </button>
              <button
                class="bg-red h-fit p-10 rounded-xl text-white text-xl flex items-center justify-center hover:bg-silver-400 focus:ring-0 transition-colors duration-200 w-1/2"
                @click="deleteProduct"
              >
                <TrashIcon class="w-8 mr-2" />
                <span class="p-2 text-2xl mt-2">Eliminar</span>
              </button>
            </div>
            <label
              class="bg-silver-50 col-start-1 col-end-3 block overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
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
              class="w-full bg-silver-50 flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <InboxStackIcon class="w-6 h-6 stroke-primary" />
              <span>
                <span class="text-md font-medium text-silver-700"> Cantidad (Stock) </span>
                <input
                  type="number"
                  v-model="product.stock"
                  disabled
                  class="mt-3 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                />
              </span>
            </label>
          </div>
          <div class="flex w-full gap-5">
            <label
              class="w-full bg-silver-50 flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <CurrencyDollarIcon class="w-7 h-7 stroke-primary" />
              <span class="w-full">
                <span class="text-md font-medium text-silver-700"> Precio unitario </span>

                <span class="flex items-center mt-2 text-2xl">
                  <span class="text-silver-300 mr-3">$</span>
                  <input
                    type="number"
                    disabled
                    v-model="product.precioUnit"
                    class="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                  />
                  <span class="text-silver-300">MXN</span>
                </span>
              </span>
            </label>

            <label
              class="w-full bg-silver-50 flex items-center gap-5 overflow-hidden rounded-md border border-silver-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <CurrencyDollarIcon class="w-7 h-7 stroke-primary" />
              <span class="w-full">
                <span class="text-md font-medium text-silver-700"> Precio Venta </span>
                <span class="flex items-center mt-2 text-2xl">
                  <span class="text-silver-300 mr-3">$</span>
                  <input
                    type="number"
                    v-model="product.precioVent"
                    disabled
                    class="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xl"
                  />
                  <span class="text-silver-300">MXN</span>
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
