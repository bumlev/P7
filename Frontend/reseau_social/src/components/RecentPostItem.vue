
<script>
    import axios from 'axios'
    export default {
        name:"Home_item",
        data(){
            return{
                recent_posts:[]
            }
        },
        beforeMount(){
            let userAuth = localStorage.getItem('userAuth');
            userAuth = JSON.parse(userAuth)
            axios.get(
                'http://localhost:3000/api/posts/recent',
                {
                    headers:{
                        'Content-type':'application/json',
                        'authorization':'Bearer '+ userAuth.token
                    }
                }
            )
            .then( recent_postsFound =>{  
                    if(recent_postsFound){
                        this.recent_posts = recent_postsFound.data;
                        console.log(this.recent_posts.length);
                    }
            })
        }
    }
</script>
<template>

<div>

    <div id="post_upload" class="post_upload">
        <span v-if="recent_posts.length > 0">Recent Post</span>
        <span v-else>No Recent Post</span>
    </div>
    <div v-for="(item , i) in recent_posts" :key="i" id="list_posts" class="list_posts">
           
        <div class="post_user">
            <img class="img_profile_upload rounded-circle" src="/images/Fresh_Tomato_Sauce_(Unsplash).jpg" />
            <span>{{item.user.username}}</span>
        </div>
        <div class="post_home">
            <span>{{item.title}}</span>
            <p v-if="item.attachment !== null">
                {{item.content}}
            </p>
            <p class="without_image" v-if="item.attachment === null">
                {{item.content}}
            </p>
            <img v-if="item.attachment !== null" class="img_post" :src="item.attachment"/>

            <div class="like_comment">
                <a href="#"> {{item.likes}} members likes this</a>
                <a href="#">{{item.comments.length}} commentaires</a>
            </div>

            <div class="appreciation">
                <button @click="like"><div><i class="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
                    <p>like</p></div></button>
                <button><div><i class="fa fa-thumbs-o-down fa-2x" aria-hidden="true"></i>
                    <p>dislike</p></div></button>
                <button @click="dislike"><div><i class="fa fa-comment-o fa-2x" aria-hidden="true"></i>
                    <p>comment</p></div></button>
            </div>
            <div class="write_comment">
                <img class="img_comment rounded-circle" src="/images/Fresh_Tomato_Sauce_(Unsplash).jpg" alt="Fresh_Tomato_Sauce_">
                <input name="content" id="content" type="text">
            </div>
            <div class="comments">
                <span class="list_comments">Comments</span>
                <div class="written_comment">
                    <img class="rounded-circle" src="/images/Fresh_Tomato_Sauce_(Unsplash).jpg" alt="Fresh_Tomato_Sauce">
                    <div class="text_comment">
                        <span class="user_comment">bumlev</span>
                        <span class="bio_comment">Software Developer at Plus Systems Ltd</span>
                        <p class="reaction">
                            Image result for l'histoire des etats unis
                            Le territoire américain fut ensuite colonisé à partir du XVII e siècle par différentes puissances européennes (Espagne, Royaume-Uni, France (Nouvelle-France). 
                            Désireux de s'affranchir de la métropole britannique et de gouverner par eux-mêmes, les colons des Treize colonies proclamèrent leur indépendance en 1776 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  

</template>