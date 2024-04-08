<script setup lang="ts">
  import JsonRequestOptions from '../../entities/jsonRequest.ts';
  import getDinamicData from '../../services/requestFunction.ts';
  // import DxDataGrid from 'devextreme-vue/data-grid';
  async function getData() {
    const rootCause: JsonRequestOptions = {
      encryptedSP: 'X_Xsm+q45OeeDDY4FSL2T/uxQ==',
    };
    const aa = await getDinamicData(rootCause);
    console.log(aa);
  }
</script>

<template>
  <div class="h-full w-full">
    <!--    <DxDataGrid :dataSource="" />-->
    <button @click="getData">GGG</button>
  </div>
</template>
