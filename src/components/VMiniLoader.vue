<script setup lang="ts">
  const props = defineProps<{
    clr: string;
  }>();
</script>

<template>
  <div class="spinner">
    <span :class="`bg-${props.clr}`"></span>
    <span :class="`bg-${props.clr}`"></span>
    <span :class="`bg-${props.clr}`"></span>
    <span :class="`bg-${props.clr}`"></span>
  </div>
</template>

<style scoped>
  .spinner {
    --gap: 5px;
    --height: 10px;
    width: 50px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--gap);
  }

  .spinner span {
    width: 6px;
    height: var(--height);
    animation: grow 1s ease-in-out infinite;
  }

  .spinner span:nth-child(2) {
    animation: grow 1s ease-in-out 0.15s infinite;
  }

  .spinner span:nth-child(3) {
    animation: grow 1s ease-in-out 0.3s infinite;
  }

  .spinner span:nth-child(4) {
    animation: grow 1s ease-in-out 0.475s infinite;
  }

  @keyframes grow {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(1.8);
    }
  }
</style>
