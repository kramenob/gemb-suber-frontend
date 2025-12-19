import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './resources/assets/styles/style.css';
import './resources/assets/styles/fonts.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#suber')
