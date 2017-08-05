# client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# start express server
npm run server

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 组件信息
* 导航侧边栏: Navigator.vue
* 标题栏: Topbar.vue
* - containers
*   - Message.vue --消息
*   - File.vue --文件
*   - Homework.vue --作业
*     - HomeworkDetail.vue --要交的作业的列表容器
*   - Discuss.vue --讨论
*     - DiscussDetail.vue --存放单条讨论的内容及回复的容器
*   - Personal.vue --个人信息
* 
* - components
*   - Login.vue --登录
*   - Register.vue --注册
*   - MsgItem.vue --单个班委的消息条
*   - MsgContent.vue --单条消息具体内容
*   - RemindForm.vue --发布通知消息的表单
*   - FileItem.vue --文件夹
*   - HomeworkSubmit.vue --布置的作业
*   - AboutSubmit.vue --查看要交的作业的单条
*   - DealHomework.vue --下载作业或者发送提醒
*   - PublishHomework.vue --发布作业的表单
*   - DiscussList.vue --多个讨论的列表
*   - DiscussForm.vue --发布讨论的表单
*   - DiscussItem.vue --单条讨论的详情
*   - Rediscuss.vue --回复讨论的内容

