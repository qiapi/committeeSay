<template>
  <div class="topbar">
    <h2>班委有话说</h2>
    <i class="fa fa-bars" aria-hidden="true" @click="showMenu"></i>
    <navigator v-bind:isShow="isShow" />
  </div>
</template>

<script>
import Navigator from './Navigator.vue'
export default {
  name: 'topbar',
  components: {
    'navigator': Navigator
  },
  data: function () {
    return {
      isShow: false
    }
  },
  methods: {
    showMenu: function () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style scoped>
.topbar {
    width: 100%;
    height: 1.2rem;
    background-color: #388e3c;
    text-align: center;
    padding-left: 0.8rem;
    box-sizing: border-box;
}
.topbar i {
    color: white;
    float: right;
    line-height: 1.2rem;
    margin-right: 0.47rem;
    font-size: 0.47rem;
}
.topbar h2 {
    display: inline-block;
    line-height: 1.2rem;
    margin: 0;
    color: white;
}
</style>
