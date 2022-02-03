<template>
    <html lang="fr">
        <head>
            <meta charset="utf-8"/>
            <Bootstrap />
        </head>
        <body>
            <header class="header">
                <img class="img_logo" src="/images/icon-left-font.png"/>
            </header>
            <register_comp/>
        </body>
    </html>
</template>
<script>
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import register_comp from '../components/register.vue';
export default {
    name:"register",
    components:{
        register_comp,
        Bootstrap
    }
}
</script>
<style>  
    body{
        max-width:1400px;
        margin:auto;
        font-family: "Raleway", "sans-serif" ;
        font-size: 14px;
        font-weight: bold;
        background-color: white;
    }
    .header{
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
</style>