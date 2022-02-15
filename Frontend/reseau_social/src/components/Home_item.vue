<script>
    import axios from 'axios'
    export default {
        name:"Home_item",
        data(){
            return{
                posts:[],
                userAuth:{},
                post:{}
            }
        },

        methods:{
            find_user(e){
                e.preventDefault()
                let userId = e.target.dataset.user;
                this.$router.push('/MyProfile/'+userId);
            },

            edit_post(e){
                e.preventDefault();
                let item = e.target;  
                let edit_item = item.nextElementSibling;
                edit_item.style.display ="flex";
                edit_item.addEventListener('mouseleave' , ()=>{
                    edit_item.style.display ="none";
                })
            },
            update_post(e){
                e.preventDefault();
                document.getElementById('save').style.display = 'none';
                document.getElementById('update').style.display = 'flex';
                let postId = e.target.dataset.post;
                console.log(postId)
                axios.get('http://localhost:3000/api/posts/'+ postId + '/post',
                    {
                        headers:{
                            'authorization': 'Bearer '+ this.userAuth.token
                        }
                    }
                )
                .then( postFound =>{
                    this.post = postFound
                    document.getElementById('id_post').value = postFound.data.id;
                   
                    document.getElementById('title').value = postFound.data.title;
                    document.getElementById('content').value = postFound.data.content;
                })
                let post_upload = document.getElementById("post_upload");
                let block_form_post = document.getElementById("block_form_post");
                post_upload.style.display = "none";
                block_form_post.style.display = "flex";

            },
            delete_post(e){
                e.preventDefault()
                let postId = e.target.dataset.post;
                axios.delete('http://localhost:3000/api/posts/'+ postId + '/delete', 
                    {
                        headers:{
                            'authorization':'Bearer ' + this.userAuth.token
                        }
                    }
                )
                .then( () =>{
                   alert('post deleted');
                   window.location.reload();
                })
            },
            like_post(e){
                 e.preventDefault()
                let like_icon =  e.target;
                let postId =like_icon.dataset.post;
                axios.post('http://localhost:3000/api/likes/'+postId+'/like',
                
                {
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':"Bearer " + this.userAuth.token
                    }
                }
                
                )
                .then((like) =>{
                    document.getElementById('liked').textContent = like.data.likes +'member(s) like this';
                    window.location.reload();
                })
            },

            dislike_post(e){
                e.preventDefault()
                let postId =e.target.dataset.post;
                console.log(postId)
               axios.post('http://localhost:3000/api/likes/'+postId+'/dislike',
                
                {
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':"Bearer " + this.userAuth.token
                    }
                }
                
                )
                .then(() =>{
                   window.location.reload()
                })
            },
            post_comment(e){
                e.preventDefault()
                let comment = e.target.value;
                let postId = e.target.dataset.post;
                axios.post('http://localhost:3000/api/comments/'+ postId +'/create', 
                    {
                        content:comment
                    },
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'authorization':'Bearer ' + this.userAuth.token
                        }
                    }
                )
                .then(() =>{
                    alert('post commented ');
                    window.location.reload();
                })
            }
        },

        beforeMount(){
            let userAuth = localStorage.getItem('userAuth');
            userAuth = JSON.parse(userAuth)
            this.userAuth = userAuth;
            axios.get(
                'http://localhost:3000/api/posts/',
                {
                    headers:{
                        'Content-type':'application/json',
                        'authorization':'Bearer '+ userAuth.token
                    }
                }
            )
            .then( postsFound =>{  
                if(postsFound){
                    this.posts = postsFound.data;
                }
            })
        }
    }
</script>

<template>
    <div v-for="(item , i) in posts" :key="i" id="list_posts" class="list_posts">
        <div class="post_user">
            <div class="user_profil">
                <img class="img_profile_upload rounded-circle" src="/images/Fresh_Tomato_Sauce_(Unsplash).jpg" />
                <a @click="find_user" :data-user="item.user.id" href="#">{{item.user.username}}</a>
            </div>
            <div class="edit_profil">
                  <a v-if="userAuth.userId == item.user.id"  @click="edit_post" id="item" class="item" href="#">...</a>
                  <div id="edit_item" class="edit_item">
                        <a @click="delete_post" :data-post="item.id" class="item_1" href="#">delete</a>
                        <a @click="update_post" :data-post="item.id" class="item_2" href="#">update</a>
                  </div>
            </div>
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
                <a id="liked"  href="#"> {{item.likes}} members likes this</a>
                <a href="#">{{item.comments.length}} commentaires</a>
            </div>

            <div class="appreciation">
                <button @click="like_post" id="like" :data-post="item.id"><div>
                    <i v-if="item.liks.some(obj => obj.userId === userAuth.userId && obj.isLike == 1)" style="color:blue" class="fa fa-thumbs-up fa-2x" aria-hidden="true"></i>
                    <i v-else class="fa fa-thumbs-up fa-2x" aria-hidden="true"></i>
                    <p>like</p></div>
                </button>
                
                <button  @click.prevent="dislike_post" id="dislike" :data-post="item.id">
                    <i v-if="item.liks.some(obj => obj.userId === userAuth.userId && obj.isLike == 0)" style="color:blue" class="fa fa-thumbs-down fa-2x" aria-hidden="true"></i>
                    <i v-else class="fa fa-thumbs-down fa-2x" aria-hidden="true"></i>
                    <p>dislike</p>
                </button>
                <button class=""><div><i class="fa fa-comment fa-2x" aria-hidden="true"></i>
                    <p>comment</p></div></button>
            </div>
            <div class="write_comment">
                <img class="img_comment rounded-circle" src="/images/Fresh_Tomato_Sauce_(Unsplash).jpg" alt="Fresh_Tomato_Sauce_">
                <input :data-user="userAuth.userId" :data-post="item.id" @keyup.enter="post_comment" v-model="content" id="content" type="text">
            </div>
            <div class="comments">
                <span class="list_comments">Comments</span>
                <div v-for="(comment , i) in item.comments" :key="i" class="written_comment">
                    <img class="rounded-circle" src="/images/Fresh_Tomato_Sauce_(Unsplash).jpg" alt="Fresh_Tomato_Sauce">
                    <div  class="text_comment">
                        <span class="user_comment"> {{comment.user.username}}</span>
                        <span class="bio_comment">{{ comment.user.bio }}</span>
                        <p class="reaction">
                           {{comment.content}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
</template>


<style>

</style>



