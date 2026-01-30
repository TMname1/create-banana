<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div>
    <h1
      class="relative -top-2.5 text-center text-[2.6rem] font-[500px] text-[#00BD7E] min-[1024px]:text-left"
    >
      {{ msg }}
    </h1>
    <h3 class="text-center text-[1.2rem] min-[1024px]:text-left">
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>
