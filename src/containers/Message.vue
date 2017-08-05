<template>
    <div class="message">
      <slot></slot>
      <div class="container">
          <div is="msg-item" v-for="(item, index) in responseDatas" v-bind:msg="item" v-bind:index="index" v-on:showDetail="isShowDetail(index)"></div>
          <!--<msg-item v-on:showDetail="isShowDetail"/>-->
          <remind-form v-on:renew="initMsg" />
          <msg-content v-bind:isShow="isShow" v-on:close="toggleShow" v-bind:itemContent="itemContent"/>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import MsgItem from '../components/MsgItem.vue'
import MsgContent from '../components/MsgContent.vue'
import RemindForm from '../components/RemindForm.vue'

export default {
  name: 'message',
  data: function () {
    return {
      isShow: false,
      responseDatas: [],
      itemContent: []
    }
  },
  components: {
    'msg-item': MsgItem,
    'msg-content': MsgContent,
    'remind-form': RemindForm
  },
  methods: {
    toggleShow: function () {
      this.isShow = !this.isShow
    },
    isShowDetail: function (index) {
      var that = this
      var committee = this.responseDatas[index]['_id']
      var p1 = new Promise(function (resolve, reject) {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/apis/message/seeDetail',
          contentType: 'application/json',
          data: JSON.stringify({
            'committee': committee
          }),
          success: function (res) {
            that.itemContent = res
            resolve()
          }
        })
      })
      p1.then(function () {
        that.toggleShow()
      })
    },
    initMsg: function () {
      console.log('init')
      var theComponent = this
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/apis/user/message',
        success: function (res) {
          theComponent.responseDatas = res
        }
      })
    }
  },
  created: function () {
    this.initMsg()
  }
}
</script>

<style scoped>
.message .container {
  padding: 0.47rem 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
