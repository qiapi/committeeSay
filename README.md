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

# 接口
* ========================================
* 登录：post: {
    username: (string)(学号),
    password: (string)
*  }
*  response: {
    identity: (string),
    name: (string),
    userlogo: (string)(src)(用户头像)
*  }
* 
* ===========================================
* 注册：post: {
    username: (string)(学号),
    password: (string),
    image: (png/jpg)
*  } 
*  response: {
    status: success/fail
*  }
* 
* ===========================================
* 点击侧边栏消息：response: {
    "学委": {
        content: [(string),(string),(string)....],
        total: (number),
        name: (string),
        unread: (number)
    },
    "班长": {
        content: [(string),(string),(string)....],
        total: (number),
        name: (string),
        unread: (number)
    },......
*  }
* ------------------------------------------------
* 点击侧边栏文件：response: ???
* ------------------------------------------------
* 点击侧边栏作业：response: [
    {
        title: (string),
        content: (string),
        date: (string)
    },{...},{...}
* ]
* ----------------------------------------------------
* 点击“提交作业”：
* post: file -->上传成功后修改对应数据的状态为 “已交”
* response: status: success/fail
* ----------------------------------------------------
* 点击“确认发布”：
* post: {
    topic: (string),
    content: (string),
    date: (string)
* }
* ------------------------------------------------------
* 点击“查看作业上交情况”：
* response: [
    {
        subject: (string),
        title: (string),
        count: (number)
    },{...},{...}
* ]
* -------------------------------------------------------
* 点击“删除”：post: id???
* -------------------------------------------------------
* 点击“下拉”：post: ???
* response: [
    {
        name: (string),
        status: (string)
    },{...},{...} 
* ]
* --------------------------------------------------------
* 点击“下载”：
* post: ???
* response: file(download)
* --------------------------------------------------------
* 点击“发送提醒”：
* post: ???
* 
* =========================================================
* 点击侧边栏讨论：
* response: [
    {
        title: (string),
        name: (string),
        date: (string)
    },{...},{...}
* ]
* ----------------------------------------------------------
* 点击“下拉”：
* post: ???
* response: {
    detail: {
        content: (string),
        beginDate: (string),
        endDate: (string),
        image: (string)
    },
    re: [
        {
            image: (string),
            name: (string),
            content: (string),
            date: (string)
        },{...},{...}
    ]
* }
* -------------------------------------------------------------
* 点击“发布帖子”：
* post: {
    topic: (string),
    content: (string),
    username: (string),
    date: (string)(new Date())
* }
