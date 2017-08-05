<template>
    <div class="content-overlay" v-if="isShow">
        <div>
          <h3>{{this.itemContent[this.index].topic}}</h3>
          <p>{{this.itemContent[this.index].content}}</p>
        </div>
        <i class="fa fa-chevron-left" aria-hidden="true" @click="prev"></i>
        <i class="fa fa-chevron-right" aria-hidden="true" @click="next"></i>
        <i class="fa fa-times" aria-hidden="true" @click="close"></i>
    </div>
</template>

<script>
export default {
  name: 'msgContent',
  props: ['isShow', 'itemContent'],
  data: function () {
    return {
      index: 0
    }
  },
  methods: {
    prev: function () {
      if (this.index > 0) {
        this.index --
      }
    },
    next: function () {
      if (this.index < this.itemContent.length - 1) {
        this.index ++
      }
    },
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.content-overlay {
    width: 100%;
    height: 100%;
    text-align:center;
    z-index: 1000;
    background-color: rgba(0,0,0,0.4);
    overflow: hidden;
    position: absolute;
    top: 1.2rem;
    left: 0;
}
.content-overlay div {
    width: 60%;
    height: 8.5rem;
    background-color: white;
    margin: 1.2rem auto;
    border-radius: 0.24rem;
    box-shadow: 0.07rem 0.07rem 0.07rem rgba(117,117,17,0.3);
    text-align: left;
    padding: 0.37rem 0.35rem;
    font-size: 0.43rem;
}
.content-overlay div h3 {
  margin: 0.15rem 0;
}
.content-overlay i {
    width: 0.71rem;
    height: 0.71rem;
    font-size: 0.71rem;
    color: #444444;
    position: absolute;
    
}
.fa-chevron-left {
    left: 1.2rem;
    top: 35%;
}
.fa-chevron-right {
    right: 1.2rem;
    top: 35%;
}
.fa-times {
  top: 0.3rem;
  right: 0.3rem;
}
</style>
