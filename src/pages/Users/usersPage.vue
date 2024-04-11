<script setup lang="ts">
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
      encryptedSP: 'X_XiWWe/Nqvp64V4dm4lhm5gA==',
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
        key-expr="USER_ID"
        :row-alternation-enabled="true"
        :show-row-lines="true"
      >
        <DxColumn data-field="USER_ID" caption="USUARIO">
          <DxRequiredRule />
          <DxPatternRule
            :pattern="onlyUpperCaseAndNumbersandDash"
            message="Debe ser en mayusculas y solo puede contener numeros y guiones"
          />
        </DxColumn>
        <DxColumn data-field="FIRST_NAME" caption="NOMBRE">
          <DxPatternRule
            :pattern="onlyUpperCase"
            message='Debe ser en mayusculas. Ejemplo: "JUAN CARLOS"'
        /></DxColumn>
        <DxColumn data-field="LAST_NAME" caption="APELLIDOS"
          ><DxPatternRule
            :pattern="onlyUpperCase"
            message='Debe ser en mayusculas. Ejemplo: "PEREZ GARCIA"'
          />
        </DxColumn>
        <DxColumn data-field="ROL" caption="ROL" />
        <DxPaging :enabled="true" />
        <DxEditing :allow-deleting="true" :allow-updating="true" :allow-adding="true" mode="popup">
          <DxPopup :width="700" :height="350"
        /></DxEditing>
      </DxDataGrid>
    </div>
  </div>
</template>
