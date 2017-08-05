<template>
    <div class="login">
        <div class="logo">
            <img src="../../static/userlogo.jpg" alt="logo">
        </div>
        <form>
            <label for="username" class="fa fa-user"></label>
            <input type="text" placeholder="username" id="username">
            <br/>
            <label for="password" class="fa fa-unlock-alt"></label>
            <input type="password" placeholder="password" id="password">
            <br/>
            <button @click="signUp">登录</button>    
        </form>
            <router-link to="register"><span>注册新用户</span></router-link>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'login',
  methods: {
    signUp: function (e) {
      var theComponent = this
      var username = $('#username').val()
      var password = $('#password').val()
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/apis/user/signUp',
        contentType: 'application/json',
        data: JSON.stringify({
          'username': username,
          'password': password
        }),
        success: function (res) {
          console.log(res)
          if (res.status === false) {
            alert(res.msg)
          } else {
            theComponent.$store.commit('setUser', res.msg)
            theComponent.$router.push('/message')
          }
        }
      })
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
.login {
    width:100%;
    height:70%;
    margin-top:20%;
    text-align: center;
}

.logo {
    height:5rem;
    width:100%;
}
.logo img {
    height:4rem;
    width:4rem;
    margin:0 auto;
    border: 0.02rem solid #84cf30;
    border-radius: 50%;
}

form {
    height:5rem;
    width:100%;
    text-align:center;
}
form label {
    padding:0.1rem 0.5rem;
}
form input {
    height:1rem;
    width:60%;
    margin:0.3rem 0;
    color:#666;
    padding-left:0.4rem;
    border:none;
    border:0.01rem solid #999;
    border-radius:0.2rem;
    font-size:0.45rem;
}
.fa {
    font-size:0.7rem;
}

form button {
    width:30%;
    height:1.1rem;
    margin-top:0.5rem;
    color:#fff;
    background-color:#388e3c;
    border:none;
    border-radius:0.2rem;
    font-size:0.5rem;
}

span {
    color:#5677fc;
    font-size:0.4rem;
    display:inline-block;
    text-align:center;
    margin-top: 0.4rem;
}
a {
  text-decoration: none;
}
</style>
