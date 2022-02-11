<template>
    <html lang="fr">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="/css/style.css" />
            <link rel="stylesheet" href="/css/responsive.css" />
        </head>
        <body>
            <login_comp/>
        </body>
    </html>
</template>
<script>
import login_comp from '../components/login_comp.vue'
export default {
    name:'login',
    components:{
        login_comp
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
</style>