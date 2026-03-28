<template>
  <div v-if="error" class="p-6 bg-red-50 border border-red-200 rounded-xl m-4">
    <h2 class="text-red-700 font-bold mb-2 flex items-center gap-2">
      <AlertTriangle :size="20" />
      出错了
    </h2>
    <p class="text-red-600 text-sm mb-4">{{ errorMessage }}</p>
    <button 
      @click="error = null" 
      class="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
    >
      重试
    </button>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'

const error = ref<any>(null)
const errorMessage = computed(() => {
  if (!error.value) return ''
  return error.value.message || '发生未知错误'
})

onErrorCaptured((err) => {
  error.value = err
  return false
})
</script>
