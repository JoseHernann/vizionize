<script setup lang="ts">
  // VUE JS 3
  import JsonRequestOptions from '../../entities/jsonRequest.ts';
  import getDinamicData from '../../services/requestFunction.ts';
  import { onMounted, ref } from 'vue';
  import {
    DxDataGrid,
    DxPaging,
    DxEditing,
    DxColumn,
    DxRequiredRule,
    DxPatternRule,
    DxPopup,
  } from 'devextreme-vue/data-grid';

  const users = ref();
  const onlyUpperCaseAndNumbersandDash = /^[A-Z0-9\-]+$/;
  const onlyUpperCase = /^[A-Z\s]+$/;

  async function getData() {
    const UsersInformation: JsonRequestOptions = {
      encryptedSP: 'X_XiWWe/Nqvp64rIyNq8A+Bj9+3IAaeuSOf',
    };
    users.value = await getDinamicData(UsersInformation);
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
        key-expr="ID_PROVEEDOR"
        :row-alternation-enabled="true"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :filter-row="{ visible: true }"
        :header-filter="{ visible: true }"
        :grouping="{ autoExpandAll: true }"
        :group-panel="{ visible: true }"
        :show-row-lines="true"
      >
        <DxColumn data-field="ID_PROVEEDOR" caption="IDENTIFICADOR">
          <DxRequiredRule />
          <DxPatternRule
            :pattern="onlyUpperCaseAndNumbersandDash"
            message="Debe ser en mayusculas y solo puede contener numeros y guiones"
          />
        </DxColumn>
        <DxColumn data-field="NOMBRE" caption="NOMBRE">
          <DxPatternRule
            :pattern="onlyUpperCase"
            message='Debe ser en mayusculas. Ejemplo: "JUAN CARLOS"'
        /></DxColumn>
        <DxColumn data-field="CONTACTO" caption="# CONTACTO"
          ><DxPatternRule
            :pattern="onlyUpperCase"
            message='Debe ser en mayusculas. Ejemplo: "PEREZ GARCIA"'
          />
        </DxColumn>
        <DxColumn data-field="DIRECCION" caption="DIRECCION" />
        <DxColumn data-field="CREATED_AT" caption="FECHA DE ADICION" />
        <DxPaging :enabled="true" />
        <DxEditing :allow-deleting="true" :allow-updating="true" :allow-adding="true" mode="popup">
          <DxPopup :width="700" :height="350"
        /></DxEditing>
      </DxDataGrid>
    </div>
  </div>
</template>
