<template>
    <div class="block_login">
                <span>Register</span>
                <form id="register" method="post" class="form_login" @submit="register">
                    <div class="login">
                        <label for="email">Email</label>
                        <input v-model="email" class="input_email" type="text" id="email"/>
                         <span id="err_email">Error de input_email</span>
                    </div>
                    <div class="login">
                        <label for="password">Password</label>
                        <input v-model="password" class="input_password" type="text" id="password"/>
                         <span id="err_password">Error de input_password</span>
                    </div>
                    <div class="login">
                        <label for="username">Username</label>
                        <input v-model="username" class="input_username" type="text" id="username"/>
                         <span id="err_username">Error de input_username</span>
                    </div>
                    <div class="login">
                        <label for="bio">Bio</label>
                        <input v-model="bio" class="input_bio" type="text" id="bio"/>
                         <span id="err_bio">Error de input_bio</span>
                    </div>
                       <span id="err">Error de error </span> 
                    <div class="login">
                        <button class="btn btn-primary">save</button>
                    </div>
                </form>
            </div>
</template>
<script>
import axios from 'axios'
//import useRouter from 'vue-router'
export default {
    name:"register_comp",  
    data(){
        return {
                email:"" ,
                password: "",
                username:"",
                bio:""
        }
    },
    methods:{
        async register(e){
            e.preventDefault();

            let err_password = document.getElementById('err_password');
            err_password.style.display = 'none';

            let err_email = document.getElementById('err_email');
            err_email.style.display = 'none';

            let err_username = document.getElementById('err_username');
            err_username.style.display = 'none';

            let err = document.getElementById('err');
            err.style.display = 'none';

            let user ={
                "email": this.email ,
                "password": this.password,
                "username": this.username,
                "bio": this.bio  
            }
            let headers = new Headers();
            headers = headers.append('Content-Type', 'application/json');
            await axios.post( 
                'http://localhost:3000/api/users/register', 
                user,
                {
                    headers : headers,
                }
            )
            .then( newUser => {
                if(newUser)
                    this.$router.push("/login");
            })
            .catch( (err) => {
                let data = err.response.data;
                console.log(data.error_server);
                if(data.password_err){
                    err_password.style.display = 'flex';
                    err_password.textContent = data.password_err;
                }
                if(data.email_err){
                    err_email.style.display = 'flex';
                    err_email.textContent = data.email_err;
                }
                if(data.username_err){
                    err_username.style.display = 'flex';
                    err_username.textContent = data.username_err; 
                }
                if(data.error_server){
                    let err = document.getElementById('err');
                    err.style.display = 'none';
                    err.style.display = 'flex';
                    err.textContent = data.error_server;
                }
                if(data.error){
                    let err = document.getElementById('err');
                    err.style.display = 'none';
                    err.style.display = 'flex';
                    err.textContent = data.error;
                }
            })   
        }
    }    
}
</script>

<style>
</style>