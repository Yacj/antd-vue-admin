import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'

// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

// 主体css
import './styles/main.css'

// 进度条css
import 'nprogress/nprogress.css'

// svg图标
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
