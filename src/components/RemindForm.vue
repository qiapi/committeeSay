<template>
    <div class="massage-release">
      <input type="text" placeholder="通知主题" id="topic">
      <textarea name="notice-text" id="content" cols="20" rows="5"></textarea>
      <button @click="publish">发布</button>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'remindForm',
  methods: {
    publish: function (e) {
      var that = this
      var topic = $('#topic').val()
      var content = $('#content').val()
      var fullName = this.$store.state.currentUser.fullName
      var avantar = this.$store.state.currentUser.headPicUrl
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/apis/message/publish',
        contentType: 'application/json',
        data: JSON.stringify({
          'topic': topic,
          'content': content,
          'fullName': fullName,
          'avantar': avantar
        }),
        success: function (res) {
          that.$emit('renew')
          alert(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.massage-release{
    width:100%;
    height:7.5rem;
    margin:0.3rem 0;
    text-align:center;
  }
.massage-release input{
    width:90%;
    height:1.2rem;
    border:none;
    border:0.01rem solid #999;
    border-radius:0.1rem;
    margin:0.5rem 0 0.3rem 0;;
    padding-left:0.5rem;
    font-size:0.45rem;
    color:#666;
  }
.massage-release textarea{
    width:87%;
    border:none;
    border:0.01rem solid #999;
    border-radius:0.1rem;
    margin:0.1rem 0;
    font-size:0.5rem;
    color:#666;
  }
.massage-release button{
    width:95%;
    height:1.2rem;
    border:none;
    border-radius:0.2rem;
    margin:0.2rem 0;
    font-size:0.5rem;
    color:#fff;
    background-color:#388e3c;
  }
</style>
