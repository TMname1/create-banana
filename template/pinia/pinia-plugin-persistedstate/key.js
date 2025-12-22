import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useKeyStore = defineStore(
  'key',
  () => {
    const key = ref('')
    return { key }
  },
  { persist: true },
)
