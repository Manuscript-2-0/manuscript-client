import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import './assets/styles/styles.scss'

//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css'

//core
import 'primevue/resources/primevue.min.css'
import { notificationPlugin } from './utils/plugins/toast'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(notificationPlugin)

app.mount('#app')
