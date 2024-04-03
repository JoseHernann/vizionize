<script setup lang="ts">
  import sideNav from '../components/sideNav.vue';
  import mainHeader from '../components/mainHeader.vue';
</script>

<template>
  <mainHeader />
  <div class="app-container">
    <sideNav />
    <RouterView class="mt main-container" />
  </div>
</template>

<style scoped>
  .mt {
    margin-top: 5rem;
  }
  .app-container {
    display: grid;
    grid-template-columns: calc(200px) 1fr;
  }

  .main-container {
    height: calc(100dvh - 80px);
    overflow-y: auto;
    padding: 1rem;
  }

  @media (max-width: 930px) {
    .main-container {
      height: calc(100dvh - 81px - 12vh) !important;
      overflow-y: auto;
      padding-inline: 1rem;
      padding-bottom: 2rem;
    }
  }

  .main-container > * {
    max-width: 1280px;
  }
</style>
