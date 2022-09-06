import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import './styles/index.scss'

import installAntDesign from './plugins/ant-design'

const app = createApp(App)
const pinia = createPinia()

installAntDesign(app)

app.use(pinia)

app.mount('#app')
