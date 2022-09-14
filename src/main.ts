import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import './styles/index.scss'

import './permission'

import installAntDesign from './plugins/ant-design'

import router from './router'

const app = createApp(App)
const pinia = createPinia()

installAntDesign(app)

app.use(pinia)
app.use(router)

app.mount('#app')
