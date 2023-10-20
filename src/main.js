import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import '@/assets/css/details.css'
import '@/assets/css/font-awesome.min.css'
import '@/assets/css/index.css'
import '@/assets/css/list.css'
import '@/assets/css/login.css'
import '@/assets/css/public-head.css'
import '@/assets/css/reset.css'
import '@/assets/css/swiper.css'
import '@/assets/css/user_center.css'
import '@/assets/css/user_pay.css'

const app = createApp(App)
app.use(router); //使用路由
app.mount('#app')
