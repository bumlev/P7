<template>
     <div class="block_login">
            <span>Register</span>
            <form class="form_login" action="#">
                <div class="login">
                    <label for="email">Email</label>
                    <input name="email" class="input_email" type="text" id="email"/>
                </div>
                <div class="login">
                    <label for="password">Password</label>
                    <input name="password" class="input_password" type="text" id="password"/>
                </div>
                <div class="login">
                    <label for="username">Username</label>
                    <input name="username" class="input_username" type="text" id="username"/>
                </div>
                <div class="login">
                    <label for="bio">Bio</label>
                    <input name="bio" class="input_bio" type="text" id="bio"/>
                </div>
                <div class="login">
                    <button class="btn btn-primary">save</button>
                </div>
            </form>
        </div>
</template>
<script>
export default {
    name:"register"
}
</script>

<style>
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
    }
</style>