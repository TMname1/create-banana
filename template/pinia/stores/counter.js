import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

// TODO: 添加pinia 的模板

// TODO: main.js要用ejs来调整

// TODO: 添加是否选择pinia持久化的功能
