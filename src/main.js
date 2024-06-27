import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = router
});

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app');