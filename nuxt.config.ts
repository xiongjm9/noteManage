import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@vueuse/motion/nuxt'
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  runtimeConfig: {
    public: {
      // Public variables
    }
  },
  app: {
    head: {
      title: '个人学习舱 | Personal Learning Cabin',
      meta: [
        { name: 'description', content: '精品学习平台，磨练你的技术栈' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap' }
      ]
    }
  }
})
