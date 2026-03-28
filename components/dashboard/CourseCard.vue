<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
    :hovered="{ y: -8, transition: { duration: 300 } }"
    class="group relative bg-white rounded-3xl border border-slate-200/20 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
  >
    <div class="relative aspect-video overflow-hidden">
      <img 
        :src="course.image" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerpolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div class="absolute top-4 left-4 flex gap-2">
        <span class="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-900 shadow-sm border border-white/20">
          {{ course.tag }}
        </span>
      </div>

      <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div class="flex -space-x-2">
          <img 
            v-for="(avatar, i) in course.instructors" 
            :key="i"
            :src="avatar" 
            class="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            referrerpolicy="no-referrer"
          />
        </div>
        <button class="p-3 bg-white text-cyan-500 rounded-full shadow-lg hover:scale-110 transition-transform">
          <Play :size="18" fill="currentColor" />
        </button>
      </div>
    </div>

    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="dev-label text-[9px] text-cyan-500 font-bold uppercase tracking-widest">
          {{ course.category }}
        </span>
        <div class="w-1 h-1 bg-slate-300 rounded-full"></div>
        <span class="dev-label text-[9px] text-slate-400 font-medium">
          {{ course.duration }}
        </span>
      </div>

      <h3 class="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-cyan-600 transition-colors">
        {{ course.title }}
      </h3>
      
      <p class="text-slate-500 text-xs leading-relaxed line-clamp-2">
        {{ course.description }}
      </p>

      <div class="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <component 
            :is="course.type === 'video' ? Video : course.type === 'audio' ? Mic : FlaskConical" 
            :size="14" 
            class="text-slate-400" 
          />
          <span class="dev-label text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            {{ course.type === 'video' ? '视频课程' : course.type === 'audio' ? '播客' : '实验室' }}
          </span>
        </div>
        
        <div v-if="course.learners" class="flex items-center gap-1">
          <Users :size="12" class="text-slate-400" />
          <span class="text-[10px] font-bold text-slate-400">{{ course.learners }} 学习者</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Play, Video, Mic, FlaskConical, Users } from 'lucide-vue-next'

defineProps<{
  course: any
  index: number
}>()
</script>
