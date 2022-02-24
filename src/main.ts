import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VuesticPlugin } from 'vuestic-ui' // <-
import 'vuestic-ui/dist/vuestic-ui.css' // <-

const app = createApp(App)

app.use(router)

app.use(VuesticPlugin);
app.mount('#app')
