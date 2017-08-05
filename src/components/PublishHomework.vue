<template>
    <div class="homework-release" v-if="isPublish">
      <form>
        <input type="text" placeholder="作业主题" id="topic">
        <input type="text" placeholder="截止日期" id="deadline">
        <textarea name="homework-text" placeholder="作业内容" cols="20" rows="5" id="content"></textarea>
        <button @click="publish">确认发布</button>
        <input type="checkbox" name="need" id="needSubmit"/><label for="need">是否需要提交电子版作业</label>
      </form>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'publishHomework',
  props: ['isPublish'],
  methods: {
    publish: function (e) {
      var that = this
      var topic = $('#topic').val()
      var deadline = $('#deadline').val()
      var content = $('#content').val()
      var needSubmit = $('#needSubmit').prop('checked')
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/apis/homework/publish',
        contentType: 'application/json',
        data: JSON.stringify({
          'topic': topic,
          'deadline': deadline,
          'content': content,
          'needSubmit': needSubmit
        }),
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
<style scoped>
.homework-release{
    width:100%;
  }
.homework-release form input{
    width:46%;
    height:1rem;
    border:none;
    border:0.01rem solid #999;
    border-radius:0.1rem;
    margin:0.1rem 0.1rem;
    font-size:0.45rem;
    color:#666;
    padding-left: 0.1rem;
  }
  .homework-release form textarea{
    width:90%;
    border:none;
    border:0.01rem solid #999;
    border-radius:0.1rem;
    margin:0.1rem 0;
    padding:0.2rem 0.3rem;
    font-size:0.45rem;
    color:#666;
  }
form button {
  width: 95%;
  height: 1.3rem;
  margin: 0.2rem 0.2rem;
  font-size: 0.4rem;
  border-radius: 0.2rem;
  border: none;
  color: white;
  background-color: #388e3c;
}
label {
  font-size:0.45rem;
  float: left;
}
#needSubmit {
  width: 1.4rem;
  height: 0.5rem;
  float: left;
  zoom: 90%;
}
</style>
