import { createApp } from 'vue'
import App from './App.vue'
import { registerProviders } from './app/providers'
import './assets/styles/main.css'

const app = createApp(App)

registerProviders(app)

app.mount('#app')
