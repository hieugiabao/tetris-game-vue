import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { SoundManagerService } from './services/sound-manager.service'
import { TetrisService } from './services/tetris.service'

const app = createApp(App)

app.use(createPinia())

// register global services
app.provide('soundManager', new SoundManagerService())
app.provide('tetrisService', new TetrisService())

app.mount('#app')
