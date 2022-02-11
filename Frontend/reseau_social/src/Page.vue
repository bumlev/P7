<template>
    <header class="header">
            <img class="img_logo" src="/images/icon-left-font.png"/>
            <nav class="margin_nav">
                <a href="#" class="p-2 text-white text-decoration-none"><i class="home_icon fa fa-home fa-2x" aria-hidden="true"></i>
                    <span> Home</span></a>
                <a href="#" class="p-2 text-white text-decoration-none"><i class="fa fa-blog fa-2x"></i>
                <span>Recent Posts</span></a>

                <a @mouseover="listdown" id="me" href="#" class="p-2 text-white text-decoration-none"><div><img class="img_profile rounded-circle" src="/images/sauce-black-cherry-vanille-infusee-au-bourbon.jpg1643043040939.jpg"/></div><div>Me<i class="fas fa-caret-down"></i></div></a>
            </nav>
    </header>
    <Home/>
</template>

<script>
import Home from './views/Home.vue';
export default {
    name:"Page", 
    components:{
        Home
    },

    methods:{
        listdown(){
            //let me = document.getElementById("me");
            let info_profile = document.getElementById("info_profile");
            info_profile.style.display = "flex";
            document.addEventListener('click' , () => {
                info_profile.style.display = "none";
            })
        }
    }
}
</script>
<style>
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

    .margin_nav{
        display: flex;
        margin-right: 40px;
    }

    .margin_nav a:nth-child(1) , .margin_nav a:nth-child(2) , .margin_nav a:nth-child(3){
        display: flex;
        flex-direction: column;
        font-weight:bold;
    }

    .margin_nav a:nth-child(1) , .margin_nav a:nth-child(2){
        margin-right: 75px;
    }
</style>