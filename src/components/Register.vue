<template>
    <div class="register">
        <div class="personal-msg" >
            <div class="personal-img"  @click="upload">
                <input type="file" id="upload-file">
                <span>点击上传头像</span>
                <img src=""/>
            </div>
        </div>
        <form>
            <label for="username" class="fa fa-user"></label>
            <input type="text" placeholder="username" id="username">
            <br/>
            <label for="password" class="fa fa-unlock-alt"></label>
            <input type="text" placeholder="password" id="password">
            <br/>
            <router-link to="login"><button @click="signIn">注册</button></router-link>          
        </form>
        <router-link to="login"><span class="rtn">返回登录页</span></router-link>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'register',
  methods: {
    upload: function () {
      $('#upload-file').click()
    },
    signIn: function (e) {
      var avantar = $('input:file')[0].files[0]
      var username = $('#username').val()
      var password = $('#password').val()
      console.log(username)
      if (avantar && username && password) {
        var userForm = new FormData()
        userForm.append('username', username)
        userForm.append('password', password)
        userForm.append('files', avantar)
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/apis/user/signIn',
          cache: false,
          data: userForm,
          processData: false,
          contentType: false,
          success: function (res) {
            alert(res.msg)
          }
        })
      } else {
        alert('your avantar or username or password is blank!')
        e.preventDefault()
      }
    }
  }
}
</script>

<style scoped>
.register {
    width:100%;
    height:70%;
    margin-top:20%;
    text-align: center;
}
#upload-file{
    display: none;
}
.personal-msg {
    height:5rem;
    width:100%;
}
.personal-img {
    height:4rem;
    width:4rem;
    margin:0 auto;
    border: 0.02rem solid #bdbdbd;
    border-radius: 50%;
}
.personal-img span {
    height:4rem;
    line-height:4rem;
    font-size:0.5rem;
    color:#666;
    display:block;
    text-align:center;
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
    color:#777;
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
    background-color:#f24d1f;
    border:none;
    border-radius:0.2rem;
    font-size:0.5rem;
}

.rtn {
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

