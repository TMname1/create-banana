<script setup lang="ts">
import TitleText from '@/components/TitleText.vue';

import { useKeyStore } from '@/stores/key.js';
const keyStore = useKeyStore();
</script>

<template>
  <TitleText
    >This is an about page ,
    <div>
      the key is:
      <span class="font-extrabold text-white"> {{ keyStore.key }}</span>
    </div>
  </TitleText>
</template>
