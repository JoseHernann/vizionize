<script setup lang="ts">
import JsonRequestOptions from '../../entities/jsonRequest.ts';
import getDinamicData from '../../services/requestFunction.ts';
import { onMounted, ref } from 'vue';
import {
  DxDataGrid,
  DxPaging,
  DxEditing,
  DxColumn,
  DxPopup,
} from 'devextreme-vue/data-grid';

const  users = ref();

async function getData() {
  const UsersInformation: JsonRequestOptions = {
    encryptedSP: 'X_XiWWe/Nqvp67rRhd574XePjkx1Oj36LyG',
  };
  users.value = await getDinamicData(UsersInformation);
  console.log(users.value)
}

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="h-full w-full">
    <div class="px-10">
      <DxDataGrid
          :data-source="users"
          key-expr="SKU"
          :row-alternation-enabled="true"
          :show-row-lines="true"
      >
        <DxColumn data-field="SKU" caption="#SKU" :width="90" />
        <DxColumn data-field="PRODUCT_NAME" caption="PRODUCTO" :width="300"/>
        <DxColumn data-field="CANTIDAD" caption="CANTIDAD EN STOCK" />
        <DxColumn data-field="PRECIO_UNITARIO" caption="PRECIO POR UNIDAD" />
        <DxColumn data-field="PRECIO_VENTA" caption="PRECIO DE VENTA" />
        <DxColumn data-field="NOMBRE" caption="PROVEEDOR" />
        <DxColumn data-field="CATEGORIA" caption="CATEGORIA" />
        <DxColumn data-field="CREATED_AT" caption="FECHA DE REGISTRO" />
        <DxPaging :enabled="true" />
        <DxEditing :allow-deleting="false" :allow-updating="false" :allow-adding="false" mode="popup">
          <DxPopup :width="700" :height="350"/>
        </DxEditing>
      </DxDataGrid>
    </div>
  </div>
</template>

<style scoped></style>
