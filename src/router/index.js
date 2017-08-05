import Vue from 'vue'
import Router from 'vue-router'
import Navigator from '@/components/Navigator'
import Message from '@/containers/Message'
import File from '@/containers/File'
import Homework from '@/containers/Homework'
import Discuss from '@/containers/Discuss'
import Personal from '@/containers/Personal'
import Topbar from '@/components/Topbar'
import Register from '@/components/Register'
import Login from '@/components/Login'
import HomeworkDetail from '@/containers/HomeworkDetail'
import DealHomework from '@/components/DealHomework'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/navigator',
      name: 'Navigator',
      component: Navigator
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/file',
      name: 'File',
      component: File
    },
    {
      path: '/homework',
      name: 'Homework',
      component: Homework
    },
    {
      path: '/discuss',
      name: 'Discuss',
      component: Discuss
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/topbar',
      name: 'Topbar',
      component: Topbar
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/homeworkdetail',
      name: 'homeworkDetail',
      component: HomeworkDetail
    },
    {
      path: '/dealHomework',
      name: 'dealHomework',
      component: DealHomework
    }
  ]
})
