<template>
  <nav class="fixed top-0 left-64 right-0 h-20 z-30 bg-white/70 backdrop-blur-xl border-b border-slate-200/20 px-8 flex items-center justify-between">
    <div class="relative w-96">
      <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input 
        type="text" 
        placeholder="搜索课程、文档或 AI 助手..." 
        class="w-full bg-slate-100/50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
      />
    </div>

    <div class="flex items-center gap-6">
      <div class="flex items-center gap-4">
        <button class="p-2 text-slate-400 hover:text-slate-900 transition-colors relative">
          <Bell :size="20" />
          <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button class="p-2 text-slate-400 hover:text-slate-900 transition-colors">
          <Settings :size="20" />
        </button>
      </div>
      
      <div class="h-8 w-[1px] bg-slate-200"></div>

      <div class="flex items-center gap-3">
        <div class="text-right">
          <p class="text-xs font-bold text-slate-900 leading-none">开发者</p>
          <p class="dev-label text-[9px] text-cyan-500 mt-1">本地模式</p>
        </div>
        <div class="w-10 h-10 rounded-full border-2 border-cyan-500/20 p-0.5">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            class="w-full h-full rounded-full object-cover"
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Search, Bell, Settings } from 'lucide-vue-next'
</script>
