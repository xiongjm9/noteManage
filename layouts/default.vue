<template>
  <div class="min-h-screen bg-surface font-sans text-slate-900 selection:bg-cyan-500/30">
    <LayoutSidebar />
    <LayoutNavbar />
    
    <main class="ml-64 pt-24 pb-32 px-8">
      <ErrorBoundary>
        <slot />
      </ErrorBoundary>
    </main>

    <footer class="ml-64 bg-slate-50 border-t border-slate-200/10 py-12 px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-lg">
              <Terminal :size="16" />
            </div>
            <h2 class="text-slate-900 font-bold text-lg tracking-tight">学习舱</h2>
          </div>
          <p class="text-slate-500 text-sm leading-relaxed max-w-md">
            致力于为开发者提供最前沿的技术学习资源，从 Node.js 到 AI 模型，助你构建全栈竞争力。
          </p>
        </div>
        <div>
          <h4 class="dev-label text-[10px] text-slate-900 font-bold mb-6 uppercase tracking-widest">学习路径</h4>
          <ul class="space-y-4 text-sm text-slate-500">
            <li><a href="#" class="hover:text-cyan-500 transition-colors">Node.js 专家</a></li>
            <li><a href="#" class="hover:text-cyan-500 transition-colors">AI 应用开发</a></li>
            <li><a href="#" class="hover:text-cyan-500 transition-colors">Python 数据科学</a></li>
          </ul>
        </div>
        <div>
          <h4 class="dev-label text-[10px] text-slate-900 font-bold mb-6 uppercase tracking-widest">社区</h4>
          <ul class="space-y-4 text-sm text-slate-500">
            <li><a href="#" class="hover:text-cyan-500 transition-colors">Discord 频道</a></li>
            <li><a href="#" class="hover:text-cyan-500 transition-colors">GitHub 开源</a></li>
            <li><a href="#" class="hover:text-cyan-500 transition-colors">技术博客</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200/50 flex justify-between items-center">
        <p class="dev-label text-[9px] text-slate-400">© 2026 个人学习舱. 保留所有权利.</p>
        <div class="flex gap-6">
          <a href="#" class="dev-label text-[9px] text-slate-400 hover:text-slate-900">隐私政策</a>
          <a href="#" class="dev-label text-[9px] text-slate-400 hover:text-slate-900">服务条款</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Terminal } from 'lucide-vue-next'
import { useData } from '~/composables/useData'

const { fetchData } = useData()

onMounted(() => {
  fetchData()
})
</script>

<style>
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  --color-surface: #f8fafc;
}

@layer base {
  body {
    @apply bg-surface antialiased;
  }
}

@layer components {
  .glass-nav {
    @apply bg-white/70 backdrop-blur-xl border-b border-slate-200/20;
  }
  
  .editorial-title {
    @apply text-4xl font-extrabold tracking-tighter leading-none;
  }
  
  .dev-label {
    @apply font-mono uppercase tracking-widest;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
