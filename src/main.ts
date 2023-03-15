import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import 'ant-design-vue/dist/antd.css'
import './styles/main.css'
import 'nprogress/nprogress.css'
const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
