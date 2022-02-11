<template>
    <div class="block_login">
            <span>Sign In</span>
            <form class="form_login" action="#" @submit="login">
                <div class="login">
                    <label for="email">Email</label>
                    <input v-model="email" class="input_email" type="text" id="email"/>
                </div>
                <div class="login">
                    <label for="password">Password</label>
                    <input v-model="password" class="input_password" type="text" id="password"/>
                </div>
                <div class="login">
                    <button class="btn btn-primary">login</button>
                </div>
            </form>
        </div>
</template>
<script>

import axios from 'axios'
export default {
    name:"login_comp",
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        async login(e){
            e.preventDefault();
            let user = {
                email:this.email,
                password: this.password
            }
            await axios.post(
                'http://localhost:3000/api/users/login',
                user
            ) 
            .then( userAuthenticated => {
                if(userAuthenticated){
                    let userId = userAuthenticated.data.userId;
                    let userisAdmin = userAuthenticated.data.userisAdmin;
                    let username = userAuthenticated.data.username;
                    let token = userAuthenticated.data.token;
                    let userAuth ={userId:userId , userisAdmin:userisAdmin , username:username , token:token};
                    localStorage.setItem('userAuth' , JSON.stringify(userAuth));
                    window.location.href = "http://localhost:8080/#/home";
                    this.$router.push('/home');
                    location.reload();
                } 
            })
            .catch( err =>{
                console.log(err);
            })
        }
    }
}
</script>

<style>
    /*.header{
        display: flex;
        justify-content: space-between;
        width: auto;
        background-color: darkslategrey;
    }

    .img_logo {
        width: 190px;
        height: 75px;
        margin-left: 10px;
        object-fit:cover ;
    }
     .block_login{
        display: flex;
        width: 400px;
        flex-direction: column;
        height: auto;
        border:1px solid rgb(209, 208, 208);
        margin: 20px auto 0 auto;   
        background-color: white;
        border-radius: 10px;
    }
    .block_login span{
        margin:20px auto 0 auto;
        font-size: 30px;
        font-style:italic;
    }
    .form_login{
        display: flex;
        flex-direction: column;
    }
    .login{
        display:flex;
        flex-direction: column;
        margin: 20px auto;
    }

    .login input{
        width: 280px;
        height:45px;
        border-radius:20px;
    }

    .login button{
        width: 280px;
        height:45px;
        font-weight: bolder;
        border-radius:20px;
    }   */
</style>