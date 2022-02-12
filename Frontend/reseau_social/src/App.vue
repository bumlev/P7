<template>
    <header class="header">
        <img class="img_logo" src="/images/icon-left-font.png"/>
        <nav class="margin_nav">
            <router-link to="/" class="p-2 text-white text-decoration-none"><i class="home_icon fas fa-user-plus fa-2x"></i>
                <span>Signup</span></router-link>
            <router-link to="/login" class="p-2 text-white text-decoration-none"><i class="fas fa-sign-in-alt fa-2x"></i>
                <span>Login</span></router-link>
        </nav>
    </header>
  <router-view />
</template>

<script>
export default {
    name:"App"
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

.margin_nav a:nth-child(1) , .margin_nav a:nth-child(2){
    display: flex;
    flex-direction: column;
    font-weight:bold;
}

.margin_nav a:nth-child(1){
    margin-right: 75px;
}
</style>
