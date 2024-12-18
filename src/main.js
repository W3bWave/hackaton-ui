import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



let app = createApp(App)



  
app.config.globalProperties.Telegram = window.Telegram;
app.config.globalProperties.ymaps = window.ymaps;

window.Telegram.WebApp.requestFullscreen()
window.Telegram.WebApp.lockOrientation()
app.use(store).use(router).mount('#app')
