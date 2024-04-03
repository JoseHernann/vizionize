<script setup lang="ts">
  import { CubeIcon } from '@heroicons/vue/24/outline';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  const icons = [CubeIcon];
  const router = useRouter();
  const selectedRouteIndex = ref(0);
  function goToRoute(route: string, index: number) {
    selectedRouteIndex.value = index;
    router.push(route);
  }
  function getAuthorizedRoutes(rol: string) {
    return router.getRoutes().filter((route) => {
      return Array.isArray(route.meta.authorizedRoles) && route.meta.authorizedRoles.includes(rol);
    });
  }
  const roleRoutes = getAuthorizedRoutes('Administrador');

  onMounted(() => {
    router.push(roleRoutes[0].path as string);
  });
</script>

<template>
  <div class="mt-20">
    <div class="gradientPurpToLilac rounded-tr-[6rem] shadow-xl h-full">
      <div class="text-auxiliar flex flex-col gap-10 pt-20">
        <div
          :class="{
            ' text-primary bg-auxiliar': selectedRouteIndex == index,

            'flex items-center gap-3 mr-5 px-3 py-2 cursor-pointer transition-colors rounded-r-xl ': true,
          }"
          v-for="(options, index) in roleRoutes"
          :key="index"
          @click="goToRoute(options.path as string, index as number)"
        >
          <component :is="icons[index]" class="w-5 h-5" />
          <span>{{ options.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .gradientPurpToLilac {
    background: linear-gradient(180deg, rgba(0, 7, 174, 0.94) 0.16%, rgba(0, 7, 174, 0) 211.35%);
  }
</style>
