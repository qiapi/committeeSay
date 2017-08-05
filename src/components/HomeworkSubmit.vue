<template>
  <div>
    <div class="submit-item" @click="showDetail">
      <span>{{msg["topic"]}}</span>
      <i class="fa fa-chevron-down" aria-hidden="true"></i>
    </div>
    <div v-if="detail" class="detail-content">
      <p>{{msg["content"]}}</p>
      <span>截止日期：{{msg["deadline"]}}</span>
    </div>
    <div v-if="msg['needSubmit']">
      <input type="file" :id="'homework-'+index"/><button @click="upload">确认上传</button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'homeworkSubmit',
  props: ['msg', 'index'],
  data: function () {
    return {
      detail: false
    }
  },
  methods: {
    showDetail: function () {
      this.detail = !this.detail
    },
    upload: function () {
      var that = this
      var homework = $('#homework-' + that.index)[0].files[0]
      var subject = this.msg['topic']
      if (homework) {
        var homeworkForm = new FormData()
        homeworkForm.append('files', homework)
        homeworkForm.append('subject', subject)
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/apis/user/submit',
          data: homeworkForm,
          cache: false,
          processData: false,
          contentType: false,
          success: function (res) {
            alert(res.msg)
          }
        })
      } else {
        alert('you haven\'t upload your homework!')
      }
    }
  }
}
</script>

<style scoped>
.submit-item {
    width: 100%;
    height: 1.5rem;
    background-color: white;
    margin-top: 0.2rem;
    border: 1px solid #bdbdbd;
    position: relative;
    text-align: left;
}
.submit-item span {
    line-height: 1.5rem;
    font-size: 0.47rem;
    margin-left: 0.5rem;
}
.submit-item i {
    position: absolute;
    right: 1rem;
    top: 0.5rem;
    font-size: 0.47rem;
}
.detail-content {
    background-color: white;
    width: 100%;
    font-size: 0.43rem;
    padding: 0.2rem 0.3rem 0.3rem 0.3rem;
    box-sizing: border-box;
    margin-top: 0.02rem;
    border-bottom: 1px solid #bdbdbd;
    text-align: left;
}
.detail-content p {
    margin: 0.2rem 0;
}
input[type="file"] {
    font-size: 0.47rem;
    width: 6rem;
}
button {
  width: 3rem;
  height: 1.2rem;
  border-radius: 0.2rem;
  border: none;
  margin-top: 0.2rem;
  color: white;
  background-color: #388e3c;
  font-size: 0.4rem;
}
</style>
