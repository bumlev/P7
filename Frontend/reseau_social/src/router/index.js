import { createRouter, createWebHashHistory } from 'vue-router'
//import Home from '../views/Home.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import homePage from '../views/Home.vue'
import RecentPost from '../views/RecentPost.vue'
import Users from '../views/Users.vue'
import MyProfile from '../views/MyProfile.vue'

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
  {
    path: auth !== null ? '/recent_post' : '/login',
    name: auth !== null ? "recent_post" : "login",
    component: auth !== null ? RecentPost : login
  },
  {
    path: auth !== null ? '/users' : '/login',
    name: auth !== null ? "users" : "login",
    component: auth !== null ? Users : login
  },
  {
    path: auth !== null ? '/MyProfile/:idUser' : '/login',
    name: auth !== null ? "MyProfile" : "login",
    component: auth !== null ? MyProfile : login
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
