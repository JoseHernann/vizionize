<script setup lang="ts">
  import { supabase } from '../../services/supabase';
  import { onMounted, ref } from 'vue';
  import DxDataGrid from 'devextreme-vue/data-grid';
  const a = ref();
  async function getTodos() {
    const { data: todos } = await supabase.from('TB_USERS').select();
    a.value = todos;

    let { data, error } = await supabase.rpc('sp_ad_get_all_users');
    if (error) console.error(error);
    else console.log(data);
  }

  onMounted(() => {
    getTodos();
  });
</script>

<template>
  <div class="h-full w-full">
    <DxDataGrid :dataSource="a" />
  </div>
</template>
