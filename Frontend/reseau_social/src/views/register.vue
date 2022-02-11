<template>
    <html lang="fr">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        </head>
        <body>
            <register_comp/>
        </body>
    </html>
</template>
<script>

import register_comp from '../components/register_comp.vue'
export default {
    name:"register",
    components:{
        register_comp
    }   
}
</script>
<style>  
    body{
        max-width:1400px;
        margin:auto;
        font-family: "Arial", "sans-serif" ;
        font-size: 14px;
        font-weight: bold;
        background-color: white;
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
        margin: 20px auto 20px auto;   
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
    #err_email , #err_password , #err_username , #err_bio {
        font-size:10px;
        color:red;
        display:none;
        
    }

    #err {
        display:none;
        font-size:13px;
        width: auto;
        height: 30px;
        border:3px solid red;
        color: rgb(56, 55, 55);
        font-weight: bold;
        border-radius: 20px;
        background-color: pink;
        padding-left:15px;
        padding-right:15px;
    }
    .login button{
        width: 280px;
        height:45px;
        font-weight: bolder;
        border-radius:20px;
    }   
</style>