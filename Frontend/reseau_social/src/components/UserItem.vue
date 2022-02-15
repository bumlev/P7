<script>
    import axios from 'axios'
    export default {
        name:"UserItem",
        data(){
            return{
                users:[],
                userAuth:"",
                user:{},
                isAdmin:""
            }
        },

        methods:{


            delete_user(e){
               let user = e.target.dataset.user;
               axios.delete('http://localhost:3000/api/users/'+user +'/delete'
               
               ).then( () =>{
                  alert('User deleted')
                  window.location.reload()
               })
            },
            update_user(e){
                let user = e.target.dataset.user;
                document.getElementById('save').style.display = 'none';
                document.getElementById('update').style.display = 'flex';

                axios.get(
                    'http://localhost:3000/api/users/'+user+"/user"
                )
                .then( userFound=>{
                    if(userFound){
                        let post_upload = document.getElementById("post_upload");
                        let block_form_post = document.getElementById("block_form_post");
                        post_upload.style.display = "none";
                        block_form_post.style.display = "flex";
                        document.getElementById('user_email').style.display="none";
                        document.getElementById('user_password').style.display="none";
                        document.getElementById('user_username').style.display="none";
                        document.getElementById('user_attachment').style.display="none";
                        document.getElementById('user_bio').style.display="none";
                        document.getElementById('title_form').style.display="none";
                        document.getElementById('access').style.display="flex";
                        document.getElementById('access').textContent="change access of " + userFound.data.username;
                        document.getElementById('id_user').value= userFound.data.id
                        if(userFound.data.isAdmin){
                            document.getElementById('admin').checked = true;
                            this.isAdmin = document.getElementById('admin').checked;
                        }
                        else{
                            document.getElementById('admin').checked = false;
                            this.isAdmin = document.getElementById('admin').checked;
                        }
                        this.user = userFound.data;
                        console.log(this.user)
                    }
                })
            },
            
        },
        beforeMount(){
            let userAuth = localStorage.getItem('userAuth');
            userAuth = JSON.parse(userAuth)
            this.userAuth = userAuth;
            axios.get(
                'http://localhost:3000/api/users/',
                {
                    headers:{
                        'Content-type':'application/json',
                        'authorization':'Bearer '+ userAuth.token
                    }
                }
            )
            .then( usersFound =>{  
                    if(usersFound){
                        this.users = usersFound.data;
                    }
            })
        },
    }
</script>
<template>
    <div v-for="(item , i) in users" :key="i" id="user_profil" class="post_profile">
        <div class="photo_user_profile">
            <img src="/images/sauce-black-cherry-vanille-infusee-au-bourbon.jpg1643043040939.jpg"/>
        </div>
        <div class="name_user">
            <span>{{item.username}}</span>
        </div>
        <p class="bio_profile bio_user">{{ item.bio }}</p>
        <div class="button_save_post button_edit_user">
            <button :data-user="item.id" id="update_user" @click="update_user"  class="btn btn-primary">Update</button>
            <button @click="delete_user" :data-user="item.id" id="cancel_post" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>