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

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <DashboardCourseCard 
        v-for="(course, i) in filteredCourses" 
        :key="course.id" 
        :course="course" 
        :index="i" 
      />
    </section>

    <!-- Background Blurs -->
    <div class="fixed top-1/4 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    <div class="fixed bottom-1/4 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'
import { COURSES } from '../constants'
import { useData } from '~/composables/useData'

const { loading } = useData()
const filters = ['全部模块', 'Node.js', 'AI 模型', 'Python', '运维开发']
const activeFilter = ref('全部模块')

const filteredCourses = computed(() => {
  if (activeFilter.value === '全部模块') return COURSES
  return COURSES.filter(c => c.category === activeFilter.value)
})
</script>
