<template>
    <div class="discuss-list">
      <p>
        <span>{{msg['topic']}}</span><span>{{msg['username']}} 发布</span><span>{{msg['date']}}</span>
        <i class="fa fa-chevron-right" aria-hidden="true" @click="seeDetail"></i>
      </p>
      <div v-if="detail" class="detail-content">
        <div class="editor">
          <p>楼主：{{msg["content"]}}</p>
          <span>{{msg['date']}}</span>
          <span @click="response">回复</span>
        </div>
        <form v-if="isResponse">
          <textarea ref="reContent"></textarea><br/>
          <button @click="submit">提交</button>
        </form>
        <div v-for="(item,index) in msg['re']" class="reStyle">
          <p>{{index+1}}楼：{{item.reply}}</p>
          <p>{{item.content}}</p>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'discussList',
  props: ['msg'],
  data: function () {
    return {
      detail: false,
      isResponse: false
    }
  },
  methods: {
    seeDetail: function () {
      this.detail = !this.detail
    },
    response: function () {
      this.isResponse = !this.isResponse
    },
    submit: function (e) {
      var that = this
      let value = this.$refs.reContent.value
      var discussId = this.msg['_id']
      var reply = this.$store.state.currentUser.fullName
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/apis/user/rediscuss',
        contentType: 'application/json',
        data: JSON.stringify({
          'reply': reply,
          'content': value,
          'discussId': discussId
        }),
        success: function (res) {
          console.log(res)
          that.$emit('updateRe')
        }
      })
      this.isResponse = false
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
}
.discuss-list{
    width:100%;
    background-color: white;
  }
  .discuss-list > p{
    display:block;
    width:90%;
    height:1.5rem;
    line-height:1.5rem;
    border-bottom:0.01rem solid #ccc;
    margin:0.3rem 0.2rem;
    padding:0 0.3rem;
    position: relative;
  }
  .discuss-list > p > span{
    display:inline-block;
    margin:0rem 0.1rem;
    font-size:0.5rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 22%;
  }
  .discuss-list > p > span:nth-child(1){
    width: 25%;
  }
  .discuss-list > p > span:nth-child(2) {
    width: 30%;
  }
  .discuss-list > p > span:nth-child(3) {
    width: 35%;
  }
  i {
      font-size: 0.4rem;
      position: absolute;
      top: 0.55rem;
      right: 0.4rem;
  }
  .editor {
    background-color: white;
    width: 100%;
    font-size: 0.43rem;
    padding: 0.2rem 0.3rem 0.3rem 0.5rem;
    box-sizing: border-box;
    margin-top: 0.02rem;
    border-bottom: 1px solid #bdbdbd;
    text-align: left;
    overflow: hidden;
  }
  .editor > p {
    margin: 0
  }
  .editor > span {
    color: #5677fc;
    font-size: 0.4rem;
    display: inline-block;
    margin-right: 0.5rem;
  }
  .editor > span:nth-child(2) {
    float: left;
  }
  .editor > span:nth-child(3) {
    float: right;
  }
  textarea {
    width: 95%;
    height: 4rem;
    box-sizing: border-box;
    margin: 0.1rem 0.3rem;
    padding: 0.2rem;
    font-size: 0.4rem;
  }
  button {
      width: 95%;
      height: 1.2rem;
      margin: 0 0.3rem;
      border-radius: 0.2rem;
      background-color: #388e3c;
      border: none;
      font-size: 0.4rem;
      color: white;
  }
  .reStyle {
    width: 100%;
    padding: 0.2rem 0.35rem;
    box-sizing: border-box;
    font-size: 0.43rem;
    border-bottom: 1px solid #bdbdbd;
  }
  .reStyle > p {
    margin: 0.2rem 0.1rem;
  }
  .editor {
    border-bottom: 1px solid #bdbdbd;
  }
  </style>
