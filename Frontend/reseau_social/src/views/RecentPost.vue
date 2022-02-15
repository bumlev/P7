<template>
  <!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
    </head>
    <body>
        <div class="groupmania">
            <div class="block_profile">
               <div class="photo_profile">
                    <img src="/images/sauce-black-cherry-vanille-infusee-au-bourbon.jpg1643043040939.jpg"/>
               </div>
               <div class="name_profile">
                    <span>{{username}}</span>
               </div>
                <p class="bio_profile">Web Developer at PLus Systems Ltd</p>
                <div class="logout">
                    <a href="#">Logout</a>
                </div>
            </div>

            <div id="posts" class="posts">
                <RecentPostItem/>
            </div>
        </div>
        <div id="info_profile" class="info_profile">  
            <div class="detail_profile">
                <img src="/images/Fresh_Tomato_Sauce_(Unsplash).jpg"/>
                <div class="role_profile"> 
                    <span>Bumwe Levy</span>
                    <p>Web Developer at PLus Systems Ltd</p>
                </div>
            </div>
            <div class="logout">
                <a @click="logout" id="logout" href="#">Logout</a>
            </div>     
        </div>
    </body>
</html>
</template>

<script>

import RecentPostItem from '../components/RecentPostItem.vue'
import axios from 'axios'
export default {
  name: 'RecentPost',
  components:{
      RecentPostItem
  },
  data(){
      return {
            username:"",
            title:"",
            content:"",
            file:"",
      }
  },
  
    methods:{
        logout(e){
            e.preventDefault();
            axios.post(
              'http://localhost:3000/api/users/logout',
              {
                  headers:{
                      'Content-type':'application/json',
                      'authorization':"Bearer " + this.auth
                  }
              }
            )
            .then( message =>{
                if(message){
                    localStorage.clear();
                    window.location.href = "http://localhost:8080/#/login";
                    this.$router.push('/login');
                    location.reload();
                }
            })
        },
    },

    beforeMount(){
        let user = localStorage.getItem('userAuth');
        user = JSON.parse(user);
        this.username = user.username;
        this.auth = user.token ;
    },
}
</script>

<style>
</style>
