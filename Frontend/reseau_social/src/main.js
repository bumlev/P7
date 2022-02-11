import { createApp } from 'vue'
import App from './App.vue'
import Page from './Page.vue'
import router from './router'

let auth = localStorage.getItem('userAuth');

if(auth != null && window.location.href === 'http://localhost:8080/#/home'){
    createApp(Page).use(router).mount('#app')
} else{
    createApp(App).use(router).mount('#app')
}
