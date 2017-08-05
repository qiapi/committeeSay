<template>
    <div>
      <slot></slot>
      <div is="discuss-list" v-for="(item, index) in responseDatas" v-bind:msg="item" v-bind:index="index" v-on:updateRe="initDiss"></div>
      <discuss-form v-on:renew="initDiss"/>
    </div>
</template>

<script>
import $ from 'jquery'
import DiscussList from '../components/DiscussList.vue'
import DiscussForm from '../components/DiscussForm.vue'

export default {
  name: 'discuss',
  components: {
    'discuss-list': DiscussList,
    'discuss-form': DiscussForm
  },
  data: function () {
    return {
      responseDatas: []
    }
  },
  methods: {
    initDiss: function () {
      var theComponent = this
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/apis/user/discuss',
        success: function (res) {
          theComponent.responseDatas = res
        }
      })
    }
  },
  created: function () {
    this.initDiss()
  }
}
</script>

<style scoped>
</style>
