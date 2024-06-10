<script setup lang="ts">
  import logo from '../assets/logoImage.vue';
  import router from "../router";
  function logout() {
    router.push('/login')
  }
</script>
<template>
  <nav class="flex justify-between items-center fixed bg-white w-screen left-0 top-0 px-5 pt-2">
    <div>
      <logo class="w-32" />
    </div>
    <div class="bg-primary rounded-[50%] w-fit h-fit px-5 py-3 text-auxiliar cursor-pointer" @click="logout">
      <span class="font-semibold">A</span>
    </div>
  </nav>
</template>

<style scoped></style>
