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
                        <a :data-user="userAuth.id" id="MyProfile" @click.prevent="MyProfile"  href="#">{{userAuth.username}}</a>
                    </div>
                    <p class="bio_profile">Web Developer at PLus Systems Ltd</p>
                    <div class="logout">
                        <a  @click="logout" href="#">Logout</a>
                    </div>
                </div>

                <div id="posts" class="posts">
                    <div id="post_upload" class="post_upload">
                        <img class="img_profile_upload rounded-circle" src="/images/sauce-black-cherry-vanille-infusee-au-bourbon.jpg1643043040939.jpg" />
                        <button @click="create_post" id="button_create_post" class="button_create_post">Create User</button>
                    </div>
                    <div id="block_form_post" class="block_form_post">
                        <span id="title_form">Create a User</span>
                        <span id="access">Change access of</span>
                        <form class="form_post" @submit.prevent="save_user">
                             <div class="post user_id"  id="user_id">
                                <label for="user">User</label>
                                <input type="text" class="input_title"  id="id_user" />
                            </div>
                            <div class="post" id="user_email">
                                <label for="email">email</label>
                                <input type="email" class="input_title" v-model="email" id="email" />
                            </div>
                             <div class="post" id="user_password">
                                <label for="password">Password</label>
                                <input type="text" class="input_title" v-model="title" id="password" />
                            </div>
                            <div class="post" id="user_username">
                                <label for="username">Username</label>
                                <input type="text" class="input_title" v-model="title" id="username" />
                            </div>
                            <div class="post" id="user_bio">
                                <label for="bio">bio</label>
                                <input type="text" class="input_title" v-model="title" id="bio" />
                            </div>
                            <div class="post" id="user_attachment">
                                <label for="attachment">Attachment</label>
                                <input v-on:change="selectFile" class="form-control input_attachment" ref="file" type="file" id="attachment" />
                            </div>
                            <div class="button_save_post" id="user_admin">
                               <div class="form-check form-switch">
                                    <input v-model="admin" class="" type="checkbox" id="admin">
                                    <label class="" for="admin">Admin</label>
                                </div>
                            </div>
                            <div class="button_save_post">
                                <button id="save" class="btn btn-success save">Save</button>
                                <button id="update" class="btn btn-success update">Save</button>
                                <button @click="close_form" id="cancel_post" class="btn btn-secondary">Cancel</button>
                            </div>
                        </form>
                    </div>
                    <!--------------------Users Profil------------------>
                    <UserItem />
                </div>
            </div>
            <div id="info_profile" class="info_profile">  
                <div class="detail_profile">
                    <img src="/images/Fresh_Tomato_Sauce_(Unsplash).jpg"/>
                    <div class="role_profile"> 
                        <span>{{username}}</span>
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

import UserItem from '../components/UserItem.vue'
//import MyProfile from '../components/MyProfile.vue'
import axios from 'axios'
export default {
  name: 'Users',
  components:{
      UserItem,
      //MyProfile
  },
  data(){
      return {
            username:"",
            file:"",
            admin:'',
            userAuth:{},
            user_id:"",
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
                      'authorization':"Bearer " + this.userAuth.token
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
        create_post(){
            let post_upload = document.getElementById("post_upload");
            let block_form_post = document.getElementById("block_form_post");
            post_upload.style.display = "none";
            block_form_post.style.display = "flex";
            document.getElementById('user_email').style.display="flex";
            document.getElementById('user_password').style.display="flex";
            document.getElementById('user_username').style.display="flex";
            document.getElementById('user_attachment').style.display="flex";
            document.getElementById('update').style.display = 'none';
            document.getElementById('save').style.display = 'flex';
            document.getElementById('access').style.display="none";
            document.getElementById('title_form').style.display="flex";
        },
        close_form(e){
            e.preventDefault();
            let post_upload = document.getElementById("post_upload");
            let block_form_post = document.getElementById("block_form_post");
            block_form_post.style.display = "none";
            post_upload.style.display = "flex";
        },
        selectFile(){
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
        recent_post(e){
            e.preventDefault();
            this.$router.go('/recent_post');
        },
        MyProfile(e){
            e.preventDefault(); 
            let userId =e.target.__vueParentComponent.data.userAuth.userId;
            console.log(userId);
            this.$router.push('/MyProfile/'+ userId);   
        },
        save_user(e){

            let isAdmin = {}
            if(e.target.elements[8].style.display === 'flex'){
                console.log(this.admin)
                if(this.admin){
                    isAdmin ={
                        isAdmin:1
                    }
                }else{
                   isAdmin ={
                        isAdmin:0
                    }
                }
                if(this.user_id !==''){
                    axios.put(
                        'http://localhost:3000/api/users/'+ this.user_id +'/update',

                        isAdmin,
                        {
                            headers:{
                                'Content-type':'application/json',
                                'authorization':'Bearer '+ this.userAuth.token
                            }
                        }
                    ).then( message =>{
                        console.log(message)
                    })
                }else{
                    console.log('aucun changement !');
                }
            }
                
        }

    },
    
   

    beforeMount(){
        let user = localStorage.getItem('userAuth');
        user = JSON.parse(user);
        this.username = user.username;
        this.userAuth = user ;
        console.log(this.userAuth);
    },
    beforeUpdate(){
        this.user_id = document.getElementById('id_user').value;
    }
}
</script>

<style>
</style>
