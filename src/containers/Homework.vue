<template>
    <div class="homework">
      <slot></slot>
      <div is="homework-submit" v-for="(item, index) in responseDatas" v-bind:msg="item" v-bind:index="index"></div>
      <div>
        <button class="publish" @click="publishHomework">发布作业</button>
        <router-link to="homeworkdetail"><button class="check">查看作业上交情况</button></router-link>
        <publish-homework :isPublish="publish" v-on:renew="initHomework"/>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import HomeworkSubmit from '../components/HomeworkSubmit.vue'
import PublishHomework from '../components/PublishHomework.vue'

export default {
  name: 'homework',
  data: function () {
    return {
      publish: false,
      responseDatas: []
    }
  },
  components: {
    'homework-submit': HomeworkSubmit,
    'publish-homework': PublishHomework
  },
  methods: {
    publishHomework: function () {
      this.publish = !this.publish
    },
    initHomework: function () {
      var that = this
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/apis/user/homework',
        success: function (res) {
          that.responseDatas = res
        }
      })
    }
  },
  created: function () {
    this.initHomework()
  }
}
</script>

<style scoped>
.homework {
  text-align: center;
}
button {
  width: 45%;
  height: 1.3rem;
  margin: 0.2rem 0.2rem;
  font-size: 0.4rem;
  border-radius: 0.2rem;
  border: none;
  color: white;
}
.publish {
  background-color: #388e3c;
}
.check {
  background-color: #f24d1f;
}
</style>
