<template>
  <div class="navigator" v-if="isShow">
    <div class="personal-msg">
      <img :src="this.$store.state.currentUser.headPicUrl">
      <span>{{this.$store.state.currentUser.fullName}}</span>
    </div>
    <ul>
      <router-link to="message"><li><i class="fa fa-envelope-o" aria-hidden="true"></i><span>消息</span></li></router-link>
      <router-link to="file"><li><i class="fa fa-file-text-o" aria-hidden="true"></i>文件</li></router-link>
      <router-link to="homework"><li><i class="fa fa-pencil" aria-hidden="true"></i>作业</li></router-link>
      <router-link to="discuss"><li><i class="fa fa-comment-o" aria-hidden="true"></i>讨论</li></router-link>
      <router-link to="personal"><li><i class="fa fa-user-o" aria-hidden="true"></i>个人信息</li></router-link>
      <router-link to="login"><li><i class="fa fa-power-off" aria-hidden="true"></i>退出</li></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navigator',
  props: ['isShow']
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.navigator {
  background-color: #388e3c; /*主题色，先暂时用这个，之后统一修改*/
  width: 6rem;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  text-align: left;
}
.personal-msg {
  background-color: white;
  height: 3rem;
}
.personal-msg img {
  width: 2rem;
  height: 2rem;
  border: 1px solid #388e3c;
  border-radius: 50%;
  margin: 0.6rem 0.3rem 0.4rem 0.3rem;
}
.personal-msg span {
  color: #388e3c;
  font-size: 0.6rem;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin: 0.8rem 0 0.2rem 0;
  vertical-align: top;
  line-height: 2rem;
}
ul {
  width: 100%;
  padding: 0;
}
li {
  list-style-type: none;
  width: 100%;
  height: 1.6rem;
  padding: 0.2rem 0.4rem;
  color: white;
  line-height: 1.4rem;
  font-size: 0.48rem;
  box-sizing: border-box;
  cursor: pointer;
}
li:hover {
  background-color: #2e7d32;
}
.fa {
  font-size: 0.52rem;
}
li i {
  margin: 0 0.7rem 0 0.12rem;
  line-height: 0.94rem;
}
</style>
