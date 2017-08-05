<template>
  <div class="deal-homework">
    <slot></slot>
    <ul ref="nameList">
      <li v-for="item in hasSubmit" class="homeworkItem">
        <span>{{item.nickName}}</span>
        <span class="has-submit">已交</span>
        <input type="checkbox" class="item-checkbox"/>
      </li>
      <li v-for="item in hasntSubmit" class="homeworkItem">
        <span>{{item.nickName}}</span>
        <span class="hasnt-submit">未交</span>
        <input type="checkbox" class="item-checkbox"/>
      </li>
    </ul>
    <form>
      <input type="checkbox" ref="hasAll" @click="hasAll"/><label>选中所有已交</label><button @click="download">下载</button><br/>
      <input type="checkbox" ref="hasntAll" @click="hasntAll"/><label>选中所有未交</label><button class="send" @click="sendRemind">发送提醒</button>
    </form>
    <router-link to="homeworkdetail"><span class="rtn">返回</span></router-link>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'dealHomework',
  data: function () {
    return {
      // items: responseData.homeworkStatus
      hasSubmit: [],
      hasntSubmit: []
    }
  },
  methods: {
    download: function (e) {
      var that = this
      let hasList = that.$refs.nameList.getElementsByClassName('has-submit')
      for (let i = 0; i < hasList.length; i++) {
        let box = hasList[i].nextSibling.nextSibling
        if (box.checked === true) {
          var topic = that.$store.state.currentHomework
          var name = hasList[i].previousSibling.previousSibling.innerText
          $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/apis/homework/download',
            contentType: 'application/json',
            data: JSON.stringify({
              'topic': topic,
              'name': name
            }),
            success: function (response, status, request) {
              var disp = request.getResponseHeader('Content-Disposition')
              if (disp && disp.search('attachment') !== -1) {
                var form = $('<form method="POST" action="http://localhost:3000/apis/homework/download"></form>')
                $('body').append(form)
                form.append('<input type="hidden" name="topic" value="' + topic + '"/>')
                form.append('<input type="hidden" name="name" value="' + name + '"/>')
                form.submit()
              }
            }
          })
          console.log(hasList[i].previousSibling.previousSibling.innerText)
        }
      }
      e.preventDefault()
    },
    sendRemind: function (e) {
      let hasntList = this.$refs.nameList.getElementsByClassName('hasnt-submit')
      for (let i = 0; i < hasntList.length; i++) {
        let box = hasntList[i].nextSibling.nextSibling
        if (box.checked === true) {
          console.log(hasntList[i].previousSibling.previousSibling.innerText)
        }
      }
      e.preventDefault()
    },
    hasAll: function () {
      let hasList = this.$refs.nameList.getElementsByClassName('has-submit')
      for (let i = 0; i < hasList.length; i++) {
        hasList[i].nextSibling.nextSibling.checked = this.$refs.hasAll.checked
      }
    },
    hasntAll: function () {
      let hasntList = this.$refs.nameList.getElementsByClassName('hasnt-submit')
      for (let i = 0; i < hasntList.length; i++) {
        hasntList[i].nextSibling.nextSibling.checked = this.$refs.hasntAll.checked
      }
    }
  },
  created: function () {
    var that = this
    var submitHomework = that.$store.state.submitHomework
    var topic = that.$store.state.currentHomework
    submitHomework.forEach(function (item) {
      if (item.topic === topic) {
        that.hasSubmit = item.submitNames
        that.hasntSubmit = item.hasntSubmit
      }
    })
  }
}
</script>

<style scoped>
.deal-homework {
  text-align: center;
}
.homeworkItem {
    box-sizing: border-box;
    width: 100%;
    height: 1.4rem;
    background-color: white;
    margin: 0.3rem 0;
    border: 1px solid #bdbdbd;
    font-size: 0.47rem;
    line-height: 1.1rem;
    position: relative;
    text-align: left;
}
.homeworkItem span {
    display: inline-block;
    width: 2rem;
    margin-left: 1.2rem;
    line-height: 1.4rem;
}
.has-submit {
    color: #5677fc;
}
.hasnt-submit {
    color: #e51c23;
}
.item-checkbox {
    zoom: 150%;
    margin-left: 3rem;
    right: 0.9rem;
    position: absolute;
    top: 0.4rem;
}
form {
  text-align: left;
}
form input {
    margin-left: 1rem;
    zoom: 150%;
    position: relative;
    top: 0.1rem;
}
form label {
    font-size: 0.4rem;
    margin-left: 0.2rem;
    margin-right: 1.5rem;
}
form button {
    width: 3.5rem;
    height: 1rem;
    border-radius: 0.2rem;
    margin-bottom: 0.3rem;
    border: none;
    font-size: 0.4rem;
    color: white;
    background-color: #388e3c;
}
.send {
    background-color: #f24d1f;
}
.rtn {
    color:#5677fc;
    font-size:0.47rem;
    display:inline-block;
    margin-top: 0.4rem;
}
</style>
