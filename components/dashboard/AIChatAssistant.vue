<template>
  <section 
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
    class="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden"
  >
    <!-- 背景装饰 -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-0"></div>
    
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Sparkles :size="20" class="text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold tracking-tight">AI 笔记助手</h2>
          <p class="text-[10px] text-slate-400 font-mono uppercase tracking-widest">基于 Gemini 1.5 Pro 驱动</p>
        </div>
      </div>

      <div class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 hide-scrollbar" ref="chatContainer">
        <div v-if="messages.length === 0" class="text-center py-8">
          <p class="text-slate-400 text-sm italic">“我可以帮你总结笔记、提取关键点或回答关于你学习内容的问题。”</p>
        </div>
        
        <div 
          v-for="(msg, i) in messages" 
          :key="i"
          :class="cn(
            'p-4 rounded-2xl text-sm leading-relaxed max-w-[85%]',
            msg.role === 'user' 
              ? 'bg-slate-800 ml-auto border border-slate-700/50' 
              : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-50'
          )"
        >
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[9px] font-bold uppercase tracking-tighter opacity-50">
              {{ msg.role === 'user' ? '你' : 'AI 助手' }}
            </span>
          </div>
          <div class="whitespace-pre-wrap">{{ msg.content }}</div>
        </div>
        
        <div v-if="aiLoading" class="flex gap-2 p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
          <div class="flex gap-1">
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <input 
          v-model="userInput" 
          type="text" 
          placeholder="问问 AI 关于你的笔记..." 
          @keyup.enter="askAI"
          :disabled="aiLoading"
          class="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all disabled:opacity-50"
        />
        <button 
          @click="askAI"
          :disabled="aiLoading || !userInput.trim()"
          class="px-6 py-3 bg-cyan-500 text-white rounded-xl text-sm font-bold hover:bg-cyan-400 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:bg-cyan-500"
        >
          <Send :size="16" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Sparkles, Send } from 'lucide-vue-next'
import { GoogleGenAI } from "@google/genai"
import { cn } from '~/lib/utils'
import { useData } from '~/composables/useData'

const { data } = useData()
const userInput = ref('')
const messages = ref<{ role: 'user' | 'ai', content: string }[]>([])
const aiLoading = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const askAI = async () => {
  if (!userInput.value.trim() || aiLoading.value) return
  
  const query = userInput.value
  messages.value.push({ role: 'user', content: query })
  userInput.value = ''
  aiLoading.value = true
  await scrollToBottom()

  try {
    // 准备上下文：将所有笔记内容合并
    const notesContext = data.value.notes?.map((n: any) => `- [${n.date}] ${n.content}`).join('\n') || '目前没有任何笔记。'
    
    // 初始化 Gemini
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{
            text: `你是一个专业的学习助手。以下是用户的学习笔记内容：\n\n${notesContext}\n\n请基于以上笔记内容回答用户的问题。如果笔记中没有相关信息，请根据你的知识库回答，但要注明哪些是基于笔记的，哪些是补充的。\n\n用户的问题：${query}`
          }]
        }
      ],
      config: {
        systemInstruction: "你是一个友好且高效的学习助手，擅长总结、分析和扩展用户的学习笔记。你的回答应该简洁明了，富有启发性。"
      }
    })

    const aiResponse = response.text || '抱歉，我无法生成回复。'
    messages.value.push({ role: 'ai', content: aiResponse })
    
  } catch (err: any) {
    console.error('AI Error:', err)
    messages.value.push({ role: 'ai', content: `出错了：${err.message}` })
  } finally {
    aiLoading.value = false
    await scrollToBottom()
  }
}
</script>
