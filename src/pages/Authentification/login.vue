<script setup lang="ts">
  import { IdentificationIcon, LockClosedIcon } from '@heroicons/vue/24/outline';
  import BgLoginImage from '../../assets/bgLoginImage.vue';
  import VInput from '../../components/VInput.vue';

  import { ref } from 'vue';
  import JsonRequestOptions from '../../entities/jsonRequest.ts';
  import getDinamicData from '../../services/requestFunction.ts';
  import { useRouter } from 'vue-router';
  import { showLargeErrorToast } from '../../utils/alerts.ts';
  import LogoImage from '../../assets/logoImage.vue';
  import LoginImage from '../../assets/loginImage.vue';
  const user = ref('');
  const password = ref('');
  const router = useRouter();
  async function login() {
    const initSession: JsonRequestOptions = {
      encryptedSP: 'X_XgpoilSJAat5lL4qvA55RIA==',
      paramValues: [
        {
          name: 'USR',
          value: user.value,
          type: 'int',
        },
        {
          name: 'PASS',
          value: password.value,
          type: 'varchar',
        },
      ],
    };

    const response = await getDinamicData(initSession);
    console.log(response);
    if (response.length != 0 && response[0].FULLNAME != '') {
      router.push('/Inventario');
    } else {
      await showLargeErrorToast('Usuario No Encontrado');
    }
  }
</script>

<template>
  <div class="overflow-hidden flex w-screen justify-end pattern">
    <div class="w-full lg:w-1/2 flex items-center justify-center">
      <div
        class="flex border border-silver-50 shadow-xl p-20 rounded-xl flex-col gap-5 -mt-32 bg-white"
      >
        <LogoImage class="absolute top-20" />
        <h1 class="font-semibold text-2xl">Iniciar Sesión</h1>
        <v-input
          id="user"
          border-color="border-silver-300"
          :icon="IdentificationIcon"
          icon-color="stroke-primary"
          v-model="user"
          placeholder=""
          label="Usuario"
          type="number"
        />
        <v-input
          id="password"
          border-color="border-silver-300"
          :icon="LockClosedIcon"
          icon-color="stroke-primary"
          v-model="password"
          placeholder=""
          label="Contraseña"
          type="password"
        />
        <button
          class="border px-3 py-2 rounded-xl bg-primary text-white hover:bg-secondary"
          @click="login"
        >
          Entrar
        </button>
      </div>
    </div>
    <div class="w-1/2">
      <login-image class="w-1/2 absolute h-[30rem] bottom-0" />
      <BgLoginImage class="h-[57.8rem]" />
    </div>
  </div>
</template>

<style scoped>
  .pattern {
    background-color: #ffffff;

    background-image: radial-gradient(#000dfd 1.05px, #ffffff 1.05px);
    background-size: 21px 21px;
  }
</style>
