<template>
  <aside class="fixed left-0 top-0 h-full w-64 z-40 bg-slate-50 border-r border-slate-200/20 flex flex-col p-6 space-y-8">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-lg">
        <Terminal :size="20" />
      </div>
      <div>
        <h2 class="text-slate-900 font-bold text-lg tracking-tight">学习舱</h2>
        <p class="dev-label text-[10px] text-slate-500">精品学习平台</p>
      </div>
    </div>

    <nav class="flex-1 space-y-2">
      <div
        v-for="item in navItems"
        :key="item.id"
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0 }"
        :hovered="{ x: 4 }"
        class="cursor-pointer"
      >
        <div
          @click="activeId = item.id"
          :class="cn(
            'flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group',
            activeId === item.id 
              ? 'bg-white text-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.1)] border-l-4 border-cyan-500' 
              : 'text-slate-500 hover:bg-slate-200'
          )"
        >
          <component 
            :is="item.icon" 
            :size="18" 
            :class="cn(
              'transition-colors',
              activeId === item.id ? 'text-cyan-500' : 'text-slate-400 group-hover:text-cyan-500'
            )" 
          />
          <span :class="cn(
            'dev-label text-xs',
            activeId === item.id && 'font-bold'
          )">
            {{ item.label }}
          </span>
        </div>
      </div>
    </nav>

    <div class="pt-6 border-t border-slate-200/50">
      <button
        v-motion
        :hovered="{ scale: 1.02 }"
        :tapped="{ scale: 0.98 }"
        class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold text-sm shadow-md"
      >
        升级专业版
      </button>
      <div class="mt-6 space-y-2">
        <a href="#" class="flex items-center gap-3 text-slate-400 hover:text-slate-900 p-2 transition-colors">
          <FileText :size="14" />
          <span class="dev-label text-[10px]">文档</span>
        </a>
        <a href="#" class="flex items-center gap-3 text-slate-400 hover:text-slate-900 p-2 transition-colors">
          <HelpCircle :size="14" />
          <span class="dev-label text-[10px]">支持</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { 
  Terminal, 
  FileCode, 
  Brain, 
  Bot, 
  Cloud, 
  FileText, 
  HelpCircle 
} from 'lucide-vue-next'
import { cn } from '../../lib/utils'

const activeId = ref('ai')

const navItems = [
  { id: 'nodejs', label: 'Node.js', icon: FileCode },
  { id: 'ai', label: 'AI 模型', icon: Brain },
  { id: 'claude', label: 'Claude', icon: Bot },
  { id: 'python', label: 'Python', icon: Terminal },
  { id: 'devops', label: '运维开发', icon: Cloud },
]
</script>
