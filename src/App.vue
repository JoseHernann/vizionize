<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import {onMounted} from "vue";
  import router from "./router";
  onMounted(() => {
    router.push('/login')
  })
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
