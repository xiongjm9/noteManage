<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-surface">
    <div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
  
  <div v-else>
    <section 
      v-motion
      :initial="{ opacity: 0, x: -20 }"
      :enter="{ opacity: 1, x: 0 }"
      class="mb-8"
    >
      <span class="dev-label text-[10px] text-cyan-500 mb-2 block">仪表盘概览</span>
      <h1 class="text-4xl font-extrabold tracking-tighter leading-none mb-2">主控制台</h1>
      <p class="text-slate-500 text-sm font-medium">欢迎来到个人学习舱，今天继续磨练你的技术栈。</p>
    </section>

    <section class="mb-10 -mx-8">
      <div class="flex gap-3 px-8 overflow-x-auto hide-scrollbar">
        <button
          v-for="(filter, i) in filters"
          :key="filter"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: i * 50 } }"
          @click="activeFilter = filter"
          :class="cn(
            'flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold tracking-tight transition-all',
            activeFilter === filter 
              ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20' 
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          )"
        >
          {{ filter }}
        </button>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <DashboardCourseCard 
        v-for="(course, i) in filteredCourses" 
        :key="course.id" 
        :course="course" 
        :index="i" 
      />
    </section>

    <!-- AI 笔记助手 -->
    <DashboardAIChatAssistant class="mb-12" />

    <!-- 动态笔记区域 -->
    <section 
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
      class="bg-white rounded-3xl border border-slate-200/20 p-8 shadow-sm"
    >
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-slate-900">我的学习笔记</h2>
          <p class="text-xs text-slate-400 mt-1">数据实时同步至本地 JSON 文件</p>
        </div>
        <button 
          @click="fetchData" 
          class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-cyan-500"
          title="刷新数据"
        >
          <RefreshCw :size="18" :class="{ 'animate-spin': loading }" />
        </button>
      </div>

      <div class="flex gap-3 mb-8">
        <input 
          v-model="newNote" 
          type="text" 
          placeholder="输入新的学习心得..." 
          @keyup.enter="addNote"
          class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
        />
        <button 
          @click="addNote"
          class="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <Plus :size="16" />
          添加
        </button>
      </div>

      <div v-if="data.notes && data.notes.length > 0" class="space-y-3">
        <div 
          v-for="(note, index) in data.notes" 
          :key="index"
          class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
        >
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <span class="text-sm text-slate-700">{{ note.content }}</span>
          </div>
          <span class="text-[10px] text-slate-400 font-mono">{{ note.date }}</span>
        </div>
      </div>
      <div v-else class="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
        <p class="text-slate-400 text-sm">暂无笔记，开始记录你的学习点滴吧</p>
      </div>
    </section>

    <!-- Background Blurs -->
    <div class="fixed top-1/4 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    <div class="fixed bottom-1/4 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, RefreshCw } from 'lucide-vue-next'
import { cn } from '../lib/utils'
import { COURSES } from '../constants'
import { useData } from '~/composables/useData'

const { data, loading, fetchData, saveData } = useData()
const filters = ['全部模块', 'Node.js', 'AI 模型', 'Python', '运维开发']
const activeFilter = ref('全部模块')
const newNote = ref('')

const filteredCourses = computed(() => {
  if (activeFilter.value === '全部模块') return COURSES
  return COURSES.filter(c => c.category === activeFilter.value)
})

const addNote = async () => {
  if (!newNote.value.trim()) return
  
  const updatedData = {
    ...data.value,
    notes: [
      { 
        content: newNote.value, 
        date: new Date().toLocaleTimeString() 
      },
      ...(data.value.notes || [])
    ]
  }
  
  await saveData(updatedData)
  newNote.value = ''
}
</script>
