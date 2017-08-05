<template>
  <ul class="pager">
    <li v-bind:class="{disable:currentPage==1}" @click="prev"><i class="fa fa-angle-left" aria-hidden="true"></i></li>
    <li v-for="n in totalNumber" @click="turn" v-bind:class="{pageActive:currentPage==n}">{{n}}</li>
    <li v-bind:class="{disable:currentPage==totalNumber}" @click="next"><i class="fa fa-angle-right" aria-hidden="true"></i></li>
  </ul>
</template>

<script>
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const responseData = {
  totalNumber: 10
}
const store = new Vuex.Store({
  state: {
    currentPage: 1
  },
  mutations: {
    turn (state, page) {
      state.currentPage = page
    },
    prev (state) {
      if (state.currentPage > 1) {
        state.currentPage --
      }
    },
    next (state) {
      if (state.currentPage < responseData.totalNumber) {
        state.currentPage ++
      }
    }
  }
})
export default {
  name: 'pager',
  data: function () {
    return {
      totalNumber: responseData.totalNumber
    }
  },
  computed: {
    currentPage () {
      return store.state.currentPage
    }
  },
  methods: {
    turn: function (e) {
      var page = e.target.innerText
      store.commit('turn', page)
    },
    prev: function () {
      store.commit('prev')
    },
    next: function () {
      store.commit('next')
    }
  }
}
</script>

<style scoped>
.pager {
  font-size: 0.38rem;
	color: #666666;
}
.pager li {
  list-style-type: none;
  border: 1px solid #d9d9d9;	
	border-radius: 3px;
  float: left;
	width: 0.7rem;
	height: 0.7rem;
	text-align: center;
	line-height: 0.7rem;
	margin-right: 0.2rem;
	cursor: pointer;
  background-color: white;
}
.pageActive {
	background-color: #F24D1F !important; /*激活状态颜色*/
	color: white;
}
.disable {
	color: #d9d9d9; /*不可用颜色*/
}
</style>
