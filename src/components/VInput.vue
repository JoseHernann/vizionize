<script setup lang="ts">
  import { computed, ref, defineProps, defineEmits, watch } from 'vue';
  import { VInputFields } from '../entities/VInputFields';
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

  const props = defineProps<VInputFields>();
  const localValue = ref(props.modelValue);
  const emmit = defineEmits(['update:modelValue']);
  const showPassword = ref(false);
  const originalValue = ref('secret');

  watch(
    () => props.type,
    (newType) => {
      if (newType === 'password' && !showPassword.value) {
        if (typeof localValue.value === 'string') {
          originalValue.value = localValue.value;
        }
      } else if (newType === 'text' && showPassword.value) {
        localValue.value = originalValue.value;
        originalValue.value = '';
      }
    },
  );

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
    if (props.type === 'password' && showPassword.value) {
      if (typeof localValue.value === 'string') {
        originalValue.value = localValue.value;
      }
    }
  };

  const inputType = computed(() => (showPassword.value ? 'text' : props.type));

  const handleInput = (event: any) => {
    localValue.value = event.target.value;
    emmit('update:modelValue', event.target.value);
  };
</script>

<template>
  <div>
    <label :for="props.id" class="block mb-2 text-sm text-gray-300">{{ props.label }}</label>
    <div class="relative">
      <div
        v-if="props.icon !== ''"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <component :is="icon" :class="`w-4 h-4 text-black ${props.iconColor}`"></component>
      </div>
      <input
        :id="props.id"
        v-model="localValue"
        :type="inputType"
        :class="`
          ${props.icon !== '' ? 'pl-10' : 'pl-3'}
          ${
            props.borderColor
          } w-full pr-3 py-2 text-gray-950 bg-transparent outline-none border focus:border-blue-200 shadow-sm rounded-lg placeholder:gray-100`"
        :placeholder="props.placeholder"
        autocomplete="on"
        @input="handleInput"
      />
      <div class="absolute inset-y-0 right-3 flex items-center pl-3">
        <EyeIcon
          v-if="props.type === 'password' && !showPassword"
          class="w-4 h-4 text-black cursor-pointer stroke-gray-500"
          @click="togglePasswordVisibility"
        />
        <EyeSlashIcon
          v-if="showPassword"
          class="w-4 h-4 text-black cursor-pointer stroke-gray-500"
          @click="togglePasswordVisibility"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
