
function registration(){
  const content = `
  <html id="wrapper">

</html>

    `;
var element = document.createElement("div");
element.innerHTML = content;
return element;
}

function handleLoginSwitch(){


const firstPageLoad = () =>{
    const userForm = document.querySelector(".user-form");
    const loginForm = loginInterface();
    userForm.innerHTML = '';
    userForm.appendChild(loginForm);
     const form = document.querySelector("#basic-form");
     console.log(form)
         if(form){
         form.addEventListener("submit",handleLogin)
         }
}
const toRegister = () =>{


         const updatableForm = document.querySelector('.message');
         const userForm = document.querySelector(".user-form");

         if(updatableForm){


               const registerForm = register();
               userForm.innerHTML = '';
               userForm.appendChild(registerForm)
                const toLoginDom = document.querySelector(".to-login");
               toLoginDom.addEventListener("click",toLogin);

         }
          const form = document.querySelector("#basic-form");
         if(form){
         form.addEventListener("submit",handleRegister)
         }

         //$('user-form').animate({height: "toggle", opacity: "toggle"}, "fast");

}
const handleRegister = async (e)=>{
e.preventDefault();
const form = document.querySelector("#basic-form");
const username =form.querySelectorAll("input")[0].value ;
const password = form.querySelectorAll("input")[1].value;
const confirmPassword = form.querySelectorAll("input")[2].value;
const data = {username:username,password1:password,password2:confirmPassword}
const response = await fetch("/rest-auth/registration/",{
method:"POST",
headers:{
 "Content-Type": 'application/json',
 "Accept" : "application/json"

},
body:JSON.stringify(data)
})

if(response.status === 200){
const data = await response.json();
const key = data.key;
//save the key
localStorage.setItem("key",key);
window.location.replace("/")
}

}
function getCookie(name) {
var cookieValue = null;
if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
return cookieValue;}



const handleLogin = async (e)=>{
e.preventDefault();
const form = document.querySelector("#basic-form");
const username =form.querySelectorAll("input")[0].value ;
const password = form.querySelectorAll("input")[1].value;
const data = {username:username,password:password}
const response = await fetch("/rest-auth/login/",{
method:"POST",
headers:{
 "Content-Type": 'application/json',
 "Accept" : "application/json",
 "X-CSRFToken" : getCookie("csrftoken")
},
body:JSON.stringify(data)
})
if(response.status === 200){
const data = await response.json();
const key = data.key;
//save the key
localStorage.setItem("key",key);
window.location.replace("/")
}
}
const toLogin = () =>{


         const updatableForm = document.querySelector('.message');
         const userForm = document.querySelector(".user-form");

         if(updatableForm){

             //render login form
              const loginForm = loginInterface();
              userForm.innerHTML = '';
              userForm.appendChild(loginForm)
               const toRegisterDom = document.querySelector(".to-register");
               toRegisterDom.addEventListener("click", toRegister);

            }
const form = document.querySelector("#basic-form");
         if(form){
         form.addEventListener("submit",handleLogin)
         }
        

         //$('user-form').animate({height: "toggle", opacity: "toggle"}, "fast");

}
const switchPages = ()=>{
     const toRegisterDom = document.querySelector(".to-register");
     toRegisterDom.addEventListener("click",toRegister);

  }

    firstPageLoad();
    switchPages();

}



