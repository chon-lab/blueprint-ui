import { createApp } from 'vue'
import App from './App.vue'
import { registerProviders } from './app/providers'

const app = createApp(App)

registerProviders(app)

app.mount('#app')