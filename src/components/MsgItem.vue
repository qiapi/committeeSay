<template>
  <div class="msg-item"  @click="isShowDetail">
    <img :src="msg.avantar[0]"/>
    <div>
      <span>{{msg["_id"]}}</span><br/>
      <span class="total">{{msg["num_total"]}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgItem',
  props: ['msg'],
  methods: {
    isShowDetail: function () {
      this.$emit('showDetail')
    }
  }
}
</script>

<style scoped>
.msg-item img {
    width: 1.9rem;
    height: 1.9rem;
    border: 1px solid black;
    border-radius: 50%;
    margin: 0.47rem;
}
.msg-item div {
    display: inline-block;
    width: 50%;
    height: 1.65rem;
    border-radius: 0.2rem;
    vertical-align: top;
    margin: 0.24rem;
    padding: 0.35rem;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.7);
    background-color: white;
}
.msg-item div span {
    display: inline-block;
}
.msg-item div span:nth-child(1) {
    font-size: 0.5rem;
    font-weight: bold;
    height: 0.94rem;
}
/*.msg-item div span:nth-child(3) {
    width: 70%;
    height: 1rem;
    font-size: 0.4rem;
}*/
.msg-item div span:nth-child(3) {
    width: 1rem;
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    border-radius: 5px;
    position: relative;
    top: -0.87rem;
    color: white;
    font-size: 0.45rem;
    float: right;
}
.unread {
    background-color: red;
}
.total {
    background-color: #bdbdbd;
}
</style>
