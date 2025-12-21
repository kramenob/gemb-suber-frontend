import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App    from './App.vue'
import router from './router'

/* dark/light theme */
import './services/theme'

import './resources/assets/styles/fonts.css';
import './resources/assets/styles/style.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#suber')