function blog(){
var content = '
<div class="user-login">
    <div class="user-form">
        <p class="form-style">FISCAL</p>

        <form action="registration.html">

        <user-form class="user-registration-form">
            <input type="text" placeholder="email"/>
            <input type="text" placeholder="password"/>
            <input type="text" placeholder="Confirm password"/>
            <button>Create</button>
            <p class="message">Already have an account? <a href="#">Login</a> </p>
        </user-form>
<user-form class="user-login-form">
     <input type="text" placeholder="email"/>
    <input type="text" placeholder="password"/>
    <button>Login</button>
     <p class="No-password">Forgot Password ?</p>
    <p class="message">Don't have an account? <a href="#">Create Account</a> </p>
</user-form>
    </div>
</div>
<script src='https://code.jquery.com/jquery-3.6.0.min.js'>

</script>
<script>



    $('.message a').click(function(){
    $('user-form').animate({height: "toggle", opacity: "toggle"}, "fast");
    });
</script>
'
var component = document.createElement("div");
component.innerHTML = content;
return component;

}

