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
                <div id="post_upload" class="post_upload">
                    <img class="img_profile_upload rounded-circle" src="/images/sauce-black-cherry-vanille-infusee-au-bourbon.jpg1643043040939.jpg" />
                    <button @click="create_post" id="button_create_post" class="button_create_post">Create Post</button>
                </div>
                <div id="block_form_post" class="block_form_post">
                    <form class="form_post" @submit="save_post" >
                        <div class="post">
                            <label for="title">Title</label>
                            <input class="input_title" v-model="title" id="title" />
                        </div>
                        <div class="post">
                            <label for="content">Content</label>
                            <textarea class="input_content" v-model="content" id="content"></textarea>
                        </div>
                        <div class="post">
                            <label for="attachment">Attachment</label>
                            <input v-on:change="selectFile" class="form-control input_attachment" ref="file" type="file" id="attachment" />
                        </div>
                        <div class="button_save_post">
                            <button class="btn btn-success">Save</button>
                            <button @click="close_form" id="cancel_post" class="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
                <HomeItem/>
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

import HomeItem from '../components/Home_item.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components:{
      HomeItem
  },
  data(){
      return {
            username:"",
            title:"",
            content:"",
            file:"",
            posts:[]
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
        create_post(){
            let post_upload = document.getElementById("post_upload");
            let block_form_post = document.getElementById("block_form_post");
            post_upload.style.display = "none";
            block_form_post.style.display = "flex";
        },

        close_form(e){
            e.preventDefault();
            let post_upload = document.getElementById("post_upload");
            let block_form_post = document.getElementById("block_form_post");
            block_form_post.style.display = "none";
            post_upload.style.display = "flex";
        },
        selectFile(){
            this.file = this.$refs.file.files[0]
        },
        save_post(e){
            e.preventDefault()
            let userAuth = localStorage.getItem('userAuth');
            userAuth = JSON.parse(userAuth);
        
            let formData = new FormData()
            formData.append("title", this.title);
            formData.append("content", this.content);
            formData.append("image", this.file);
            axios.post(
                'http://localhost:3000/api/posts/create',
                formData ,
                {
                    headers:{
                        'Content-Type':'multipart/form-data',
                        'authorization' : 'Bearer ' + userAuth.token
                    },
                    
                }
            )
            .then( newPost =>{
                if(newPost){
                    axios.get(
                        'http://localhost:3000/api/posts/',
                        {
                           headers:{
                               'authorization' : 'Bearer ' + userAuth.token
                           } 
                        }
                    ).then( newposts =>{
                        if(newposts){
                            this.posts = newposts.data;
                            window.location.reload();
                        }
                    })
                }
            })
            .catch( err =>{
                console.log(err.response);
            })
        }

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
