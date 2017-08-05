<template>
    <div class="discuss-release">
    <form action="">
      <div class="discuss-content">
        <label for="discuss-topic">主题：</label>
        <input type="text" class="discuss-topic" placeholder="请输入主题" id="topic"><br />
        <label for="discuss-text">内容：</label>
        <textarea name="discuss-text" placeholder="请输入主要内容" cols="30" rows="5" id="content"></textarea>
      </div>
      <button @click="upload">发布帖子</button>
    </form>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'discussForm',
  methods: {
    upload: function (e) {
      var that = this
      var topic = $('#topic').val()
      var content = $('#content').val()
      var username = this.$store.state.currentUser.fullName
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/apis/discuss/publish',
        data: JSON.stringify({
          'topic': topic,
          'content': content,
          'username': username
        }),
        contentType: 'application/json',
        success: function (res) {
          that.$emit('renew')
          alert(res.msg)
        }
      })
      e.preventDefault()
    }
  }
}
</script>

<style>
.discuss-release {
    width:100%;
    height:7.5rem;
    margin:0.1rem 0;
    text-align:center;
    font-size:0.5rem;
  }
.discuss-content {
    text-align: left;
}
.discuss-topic {
    width:74%;
    height:1rem;
    border:none;
    border:0.01rem solid #999;
    border-radius:0.1rem;
    margin:0.1rem 0;;
    padding-left:0.4rem;
    font-size:0.45rem;
    color:#666;
  }
textarea {
    width:70%;
    border:none;
    border:0.01rem solid #999;
    border-radius:0.1rem;
    margin-top: 0.1rem;
    padding:0.1rem 0.4rem;
    font-size:0.45rem;
    color:#666;
    vertical-align: top;
  }

.discuss-release button {
    width:95%;
    height:1.2rem;
    border:none;
    border-radius:0.2rem;
    margin:0.2rem 0;
    font-size:0.5rem;
    color:#fff;
    background-color:#ff7043;
  }
</style>
