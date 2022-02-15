import { createApp } from 'vue'
import App from './App.vue'
import Page from './Page.vue'
import router from './router'

let auth = localStorage.getItem('userAuth');
auth = JSON.parse(auth)
let router_Page = (window.location.href === 'http://localhost:8080/#/MyProfile/' || window.location.href === 'http://localhost:8080/#/home'|| window.location.href === 'http://localhost:8080/#/recent_post' || window.location.href === 'http://localhost:8080/#/users')
if(auth != null && router_Page){
    createApp(Page).use(router).mount('#app')
} else{
    createApp(App).use(router).mount('#app')
}
