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
                    <p class="bio_profile">{{userAuth.bio}}</p>
                    <div class="logout">
                        <a  @click="logout" href="#">Logout</a>
                    </div>
                </div>

                
                <div id="posts" class="posts">
                     <div id="block_form_post" class="block_form_post">
                        <span id="access">Edit User</span>
                        <form class="form_post" @submit.prevent="update_user">
                            <div class="post" id="user_email">
                                <label for="email">email</label>
                                <input type="email" class="input_title" v-model="email" id="email" />
                            </div>
                             <div class="post" id="user_password">
                                <label for="password">Password</label>
                                <input type="text" class="input_title" v-model="password" id="password" />
                            </div>
                            <div class="post" id="user_username">
                                <label for="username">Username</label>
                                <input type="text" class="input_title" v-model="username" id="username" />
                            </div>
                            <div class="post" id="user_bio">
                                <label for="bio">bio</label>
                                <input type="text" class="input_title" v-model="bio" id="bio" />
                            </div>
                            <!--<div class="post" id="user_attachment">
                                <label for="attachment">Attachment</label>
                                <input v-on:change="selectFile" class="form-control input_attachment" ref="file" type="file" id="attachment" />
                            </div>-->
                            <div v-if="userAuth.isAdmin" class="button_save_post" id="user_admin">
                               <div class="form-check form-switch">
                                    <input v-model="admin" class="" type="checkbox" id="admin">
                                    <label class="" for="admin">Admin</label>
                                </div>
                            </div>
                            <div class="button_save_post">
                                <button id="save" class="btn btn-success save">Save</button>
                                <button @click="close_form" id="cancel_post" class="btn btn-secondary">Cancel</button>
                            </div>
                        </form>
                    </div>   
                    <div id="user_profil" class="post_profile">
                        <div class="photo_user_profile">
                            <img src="/images/sauce-black-cherry-vanille-infusee-au-bourbon.jpg1643043040939.jpg"/>
                        </div>
                        <div class="name_user">
                            <span>{{user.username}}</span>
                        </div>
                        <p class="bio_profile bio_user">{{user.bio}}</p>
                        <div v-if="userAuth.userId == user.id || userAuth.isAdmin" class="button_save_post button_edit_user">
                            <button @click ="edit_user" id="edit_user"  class="btn btn-primary">Edit</button>
                            <button @click="delete_user" :data-user="user.id" id="cancel_update" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>   
            </div>
        </body>
    </html>
</template>
<script>
import axios from 'axios'
export default {
    name:"MyProfile",
    data(){
        return{
            userAuth:{},
            user:{},
            email:"",
            password:"",
            username:"",
            bio:""
        }
    },
    methods:{
        MyProfile(){
            //console.log(e.target);
        },
        delete_user(e){
            let userId = e.target.dataset.user;
            axios.delete('http://localhost:3000/api/users/'+userId+ '/delete')
            .then(userDeleted =>{
                console.log('User ' + userDeleted.username +' deleted with success');
                localStorage.clear();
                this.$router.push('/login');
                location.reload();
            })
        },
        edit_user(){
            let user_profil = document.getElementById("user_profil");
            let block_form_post = document.getElementById("block_form_post");
            user_profil.style.display = "none";
            block_form_post.style.display = "flex";
            this.username = this.user.username;
            this.bio = this.user.bio;

        },
        close_form(){
            let user_profil = document.getElementById("user_profil");
            let block_form_post = document.getElementById("block_form_post");
            block_form_post.style.display = "none";
            user_profil.style.display = "flex";
           
        },

        update_user(){

            axios.put('http://localhost:3000/api/users/'+this.user.id+'/update',
            {
                email:this.email,
                password:this.password,
                username: this.username,
                bio:this.bio
            },
            {
                headers:{
                    'Content-Type':'application/json',
                    'authorization': 'Bearer '+ this.userAuth.token
                }
            }
            ).then( userUpdate =>{
                console.log(userUpdate);
                this.$router.push('/home');
            }).catch( err =>{
                console.log( err);
            })
        }
        
    },
    
    beforeMount(){
        let userAuth = localStorage.getItem('userAuth');
        userAuth = JSON.parse(userAuth);
        this.userAuth = userAuth;

        /// Update profil
        let userId = this.$route.params.idUser;
        axios.get('http://localhost:3000/api/users/'+userId + '/user',
        )
        .then( userFound =>{
            if(userFound){
                this.user = userFound.data;
            }
        }).catch( err =>{
            console.log( err)
        })
        
    },
}
</script>