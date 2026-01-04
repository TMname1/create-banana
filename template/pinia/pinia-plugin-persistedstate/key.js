import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useKeyStore = defineStore(
  'key',
  () => {
    const key = ref('Hello Pinia Persisted State!');
    return { key };
  },
  { persist: true }
);
