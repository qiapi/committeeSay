<template>
    <div class="homework-addup">
      <span class="topic">{{msg["topic"]}}</span><span>{{msg["submitNum"]}}人已交</span><span @click="del">删除</span>
      <router-link to="dealHomework"><i class="fa fa-chevron-down" aria-hidden="true" @click="currentHomework"></i></router-link>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'aboutSubmit',
  props: ['msg'],
  methods: {
    del: function () {
      var that = this
      var topic = that.msg['topic']
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/apis/homework/delete',
        contentType: 'application/json',
        data: JSON.stringify({
          'topic': topic
        }),
        success: function (res) {
          that.$emit('renew')
          alert(res)
        }
      })
    },
    currentHomework: function () {
      this.$store.state.currentHomework = this.msg['topic']
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.homework-addup{
    box-sizing: border-box;
    text-align: left;
    width:100%;
    height:3rem;
    background-color: white;
    display:block;
    height:1.5rem;
    line-height:1.5rem;
    border-bottom:0.01rem solid #ccc;
    margin:0.3rem 0;
    padding:0 0.3rem;
  }
  .homework-addup span{
    display:inline-block;
    font-size:0.5rem;
  }
  .topic {
    width: 40%;
  }
  .homework-addup span:nth-child(1){
    font-weight:bold;
  }
  .homework-addup span:nth-child(2){
    color:blue;
    width: 30%;
  }
  .homework-addup span:nth-child(3){
    color:red;
  }
  i {
      position: relative;
      top: -0.1rem;
      left: 0.4rem;
      font-size: 0.4rem;
  }
</style>
