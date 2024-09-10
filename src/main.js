//import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from "axios"

const app = createApp(App)
app.config.globalProperties.$axios = axios
axios.defaults.baseURL = "http://127.0.0.1:8000/" //import.meta.env.BACKEND_API_ENDPOINT
app.use(createPinia())
app.use(router)

app.mount('#app')
