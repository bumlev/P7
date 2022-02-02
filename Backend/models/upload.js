
//// Get upload 
let button_create_post =  document.getElementById("button_create_post");
let block_form_post = document.getElementById("block_form_post");
let post_upload = document.getElementById("post_upload");
let cancel_post = document.getElementById("cancel_post");
let info_profile = document.getElementById("info_profile")

button_create_post.addEventListener('click' , () => {
    post_upload.style.display = "none";
    block_form_post.style.display = "flex";
})

cancel_post.addEventListener('click' , () => {
    block_form_post.style.display = "none";
    post_upload.style.display = "flex";
})

me.addEventListener('mouseover' , () => {
    info_profile.style.display = "flex";
})

document.addEventListener('click' , () => {
    info_profile.style.display = "none";
})
