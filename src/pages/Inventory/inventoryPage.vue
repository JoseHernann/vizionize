<script setup lang="ts">

function handelFile(e){
  console.log(e.target.files[0])
}
</script>

<template>
  <div class="h-full w-full">
    <div>Pagina de inventario</div>
    <input type="file" @change="handelFile">
  </div>
</template>

<style scoped></style>
