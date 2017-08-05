<template>
  <div class="homework-detail">
    <slot></slot>
    <div is="about-submit" v-for="(item, index) in responseDatas" v-bind:msg="item" v-bind:index="index" v-on:renew="initSubmit"></div>
    <router-link to="homework"><span class="rtn">返回</span></router-link>
  </div>
</template>

<script>
import $ from 'jquery'
import AboutSubmit from '../components/AboutSubmit.vue'
export default {
  name: 'homeworkDetail',
  components: {
    'about-submit': AboutSubmit
  },
  data: function () {
    return {
      responseDatas: []
    }
  },
  methods: {
    initSubmit: function () {
      var that = this
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/apis/homework/subject',
        success: function (res) {
          that.responseDatas = res
          that.$store.state.submitHomework = res
        }
      })
    }
  },
  created: function () {
    this.initSubmit()
  }
}
</script>

<style scoped>
.homework-detail {
  text-align: center;
}
.rtn {
    color:#5677fc;
    font-size:0.47rem;
    display:inline-block;
    margin-top: 0.4rem;
}
</style>
