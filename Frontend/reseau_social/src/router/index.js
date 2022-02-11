import { createRouter, createWebHashHistory } from 'vue-router'
//import Home from '../views/Home.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import homePage from '../views/Home.vue'

let auth = localStorage.getItem('userAuth');

const routes = [
  {
    path:'/',
    name:"register",
    component: register
  },
  {
    path:'/login',
    name:"login",
    component:login
  },
  {
    path: auth !== null ? '/home' : '/login',
    name: auth !== null ? "home" : "login",
    component: auth !== null ? homePage : login
  },
  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
