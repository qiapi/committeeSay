var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken')

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
//连接数据库
MongoClient.connect('mongodb://localhost:27017/committeeSay', function(err, database) {
  if(err) {
    throw err;
  }
  db = database;
})

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

var currentUser;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录
router.use('/user/signUp',function(req, res, next) {
  //获取用户输入的用户名和密码
  var username = req.body.username;
  var password = req.body.password;
  console.log(username)
  //在数据库中查找对应的用户，以数组的形式返回
  db.collection('users').find({"username":username}).toArray(function(err, result){
    if(err) {
      throw err;
    }
    else{
      //如果不存在，则数组的长度为0
      if(result.length===0) {
        res.send({
          "status": false,
          "msg": "user doesn't exits!"
        })
      }
      //如果存在，则检查密码是否正确
      else {
        if(result[0].password===password){
          //登录成功，将用户信息保存到全局的变量“currentUser”
          currentUser = result[0];

          const currentUserEncode = jwt.sign(result[0], 'CJH')
          res.cookie('jwt', currentUserEncode)
          res.send({
            "status": true,
            "msg": result[0]
          })
        }
        else {
          res.send({
            "status": false,
            "msg": "password error!"
          })
        }
      }
    }
  })
});

// jwt decode
router.post('/user/decode', function(req, res, next) {
  const currentUserEncode = req.body.jwt
  const currentUser = jwt.verify(currentUserEncode, 'CJH')
  res.send(currentUser)
})

//注册
router.post('/user/signIn', function(req, res, next) {
  var isExsit,tmp;
  var form = new formidable.IncomingForm();
  //创建用户头像目录
  var uploadDir = path.join(__dirname,'../static/public');
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }
  var uploadDir = path.join(__dirname,'../static/public/users');
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }
  var uploadDir = path.join(__dirname,'../static/public/users/avantar');
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }
  //设置上传文件目录
  form.uploadDir=uploadDir;
  form.keepExtensions = true;
  form.parse(req,function(err, fields,files){
    for(var key in files){
      if( files[key].path){
        tmp = key;
        break;
      }
    }
    //获取用户注册的用户名和密码
    var newUsername = fields.username;
    var newPassword = fields.password;
    var fullName = '';
    var filePath = files[tmp].path;
    console.log(filePath)
    var fileExt = filePath.substring(filePath.lastIndexOf("."));
    var fileName = newUsername + fileExt;
    console.log(fileName)
    fs.renameSync(filePath, path.join(__dirname,'../static/public/users/avantar/') + fileName)
      var p1 = new Promise(function(resolve, reject){
      //在数据库中查找是否已存在该用户
        db.collection('users').find().toArray(function(err, result) {
          isExsit = result.some(function(userItem){
            return newUsername===userItem.username
          })
          console.log(isExsit);
          if(isExsit){
            reject()
          }
          else {
            //nameList是允许注册的用户学号和名字的列表，如果列表中不存在该学号则不允许注册
            db.collection('nameList').find({[newUsername]:{$type:2}}).toArray(function(err, result) {
              if(result[0]) {
                console.log(result[0]);
                console.log(result[0][newUsername])
                fullName = result[0][newUsername];//找到名单中对应学号的姓名
                db.collection('users').insert({
                  "username": newUsername,
                  "password": newPassword,
                  "fullName": fullName,
                  "headPicUrl": "../static/public/users/avantar/"+fileName
                })
                resolve()
              }
              else {
                res.send({
                  "status":false,
                  "msg": 'your account are not allow to signIn!'
                });
              }
            })
          }
      })
      })
    //根据查找结果返回对应的信息
      p1.then(function(){
        res.send({
          "status": true,
          "msg": "注册成功"
        })
      },function(){
        res.send({
          "status": false,
          "msg": "user has exist!"
        })
      })

  })
});

//进入消息页
router.use('/user/message', function(req, res, next) {
    db.collection('messages').aggregate([{$group:{_id:"$publisher",num_total:{$sum:1},avantar:{$push:"$avantar"}}}]).toArray(function(err, result){
      if(err) throw err;
      res.send(result);
    })
})

//查看班委消息的详情
router.use('/message/seeDetail', function(req, res, next) {
  var committee = req.body.committee;//请求的班委
  db.collection('messages').find({"publisher":committee}).toArray(function(err, result) {
    if(err) throw err;
    res.send(result)
  })
})

//发布通知消息
router.use('/message/publish', function(req, res, next) {
  var data = {
    "publisher": req.body.fullName,
    "avantar": req.body.avantar,
    "topic": req.body.topic,
    "content": req.body.content
  }
  console.log(data)
  //插入数据库消息的集合
  db.collection('messages').insert(data, function(){
    data["status"] = false;
    //更新每个用户的消息列表
    // db.collection('users').update({
    //   "username":{$type:2}
    // },{
    //   $push:{
    //     "messages":data
    //   }
    // },{
    //   upsert:true,
    //   multi:true
    // });
    res.send({
      "status":true,
      "msg":"success publish!"
    });
  })
});

//查看发布的作业
router.use('/user/homework', function(req, res, next) {
  db.collection('homework').find().toArray(function(err, result){
    if(err) throw err;
    res.send(result);
  })
});

//发布作业
router.use('/homework/publish', function(req, res, next) {
  var data = {
    "topic": req.body.topic,
    "deadline": req.body.deadline,
    "content": req.body.content,
    "needSubmit": req.body.needSubmit
  }
  db.collection('homework').insert(data, function(err, record){
    if(err) throw err;
    res.send({
      "status": true,
      "msg": "publish success!"
    })
  })
})

//上交作业
router.use('/user/submit', function(req, res, next) {
  var tmp;
  var form = new formidable.IncomingForm();
  //创建上交作业目录
  var uploadDir = path.join(__dirname,'../static/public');
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }
  var uploadDir = path.join(__dirname,'../static/public/users');
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }
  var uploadDir = path.join(__dirname,'../static/public/users/homework');
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }
  form.uploadDir = path.join(__dirname,'../public/tmp');;
  form.keepExtensions = true;
  form.parse(req, function(err, fields,files){
    for(var key in files){
      if( files[key].path){
        tmp = key; 
        break;
      }
    }
    var subject = fields.subject;
    var filePath = files[tmp].path;
    var fileName = files[tmp].name;
    var uploadDir = path.join(__dirname,'../static/public/users/homework/' + subject);
    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }
    console.log(fileName)
    try {
      fs.renameSync(filePath, uploadDir + "/" + fileName);//此处有问题
    }
    catch(e) {
      console.log(e)
    }
    res.send({
      "status": true,
      "msg": "upload success!"
    })
  })
})

//查看作业上交情况
router.use('/homework/subject', function(req, res, next) {
  var submitList = [];
  var p1;
  db.collection('homework').find({"needSubmit":true}).toArray(function(err, result) {
      if(err) {
        console.log('err')
        p1 = new Promise(function(resolve, reject) {
          reject();
        })
      };
      if(result.length!==0) {
        result.forEach(function(item){
          var topic = item.topic;
          var dir = path.join(__dirname,'../static/public');
          if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          dir = path.join(__dirname,'../static/public/users');
          if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          dir = path.join(__dirname,'../static/public/users/homework');
          if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          dir = path.join(__dirname,'../static/public/users/homework/'+ topic);
          if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          var files = fs.readdirSync(dir);
          var filenames =[];
          files.forEach(function(filename){
              var fullname = path.join(dir,filename);
              var stats = fs.statSync(fullname);
              if(stats.isDirectory()) filename += '/';
              filename = filename.substring(0, filename.indexOf("."));
              filenames.push(filename);
          });
          p1 = new Promise(function(resolve, reject){
            db.collection('nameList').find().toArray(function(err, result) {
              var hasSubmit = result.filter(function(per){
                for(var key in per) {
                    var name = per[key];
                    per.nickName = name;
                }
                for(var i = 0; i< filenames.length;i++){
                  if(filenames[i].indexOf(name)!==-1){
                    return true;
                  }
                }
                return false;
              });
              var hasntSubmit = result.filter(function(per){
                for(var i = 0; i< filenames.length;i++){
                  for(var key in per) {
                    var name = per[key];
                  }
                  if(filenames[i].indexOf(name)!==-1){
                    return false;
                  }
                }
                return true;
              });
              var list = {};
              list.topic = topic;
              list.submitNum = hasSubmit.length;
              list.submitNames = hasSubmit;
              list.hasntSubmit = hasntSubmit;
              submitList.push(list);
              resolve(submitList);
            })
          });
        })
      }
      else {
        p1 = new Promise(function(resolve, reject){
          reject();
        })
      }
      p1.then(function(value){
        res.send(value);
      },function(){
        res.send([])
      })
    })
    
})
//下载作业
router.use('/homework/download', function(req, res, next) {

  var topic = req.body.topic;
  var name = req.body.name;
  var dir = path.join(__dirname,'../static/public/users/homework/'+ topic);
  console.log(dir);
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  var files = fs.readdirSync(dir);
  var filenames =[];
  files.forEach(function(filename){
      var fullname = path.join(dir,filename);
      var stats = fs.statSync(fullname);
      if(stats.isDirectory()) filename += '/';
      console.log(fullname);
      console.log(filename);
      console.log(filename.indexOf(name)!==-1);
      if(filename.indexOf(name)!==-1) {
        res.download(fullname);
      }
  });

})
//删除作业条目
router.use('/homework/delete', function(req, res, next) {
  var item = req.body.topic;
  console.log(item)
  db.collection('homework').remove({"topic":item}, function(err, record) {
    if(err) throw err;
    res.send('success delete');
  });
})
//发布讨论
router.use('/discuss/publish', function(req, res, next) {
  var data = {
    "topic": req.body.topic,
    "content": req.body.content,
    "username": req.body.username,
    "date": new Date().getFullYear() + '年' + (new Date().getMonth()+1) + '月' + new Date().getDate() + '日'
  }
  console.log(data);
  db.collection('discuss').insert(data, function(err, record){
    if(err) throw err;
    res.send({
      "status": true,
      "msg": "succeed"
    });
  })
})
//进入讨论页
router.use('/user/discuss', function(req, res, next) {
  db.collection('discuss').find().toArray(function(err, result){
    if(err) throw err;
    res.send(result);
  })
})

//回复讨论
router.use('/user/rediscuss', function (req, res, next) {
  var data = {
    'reply': req.body.reply,
    'content': req.body.content
  }
  db.collection('discuss').update({"_id":ObjectID(req.body.discussId)},{$push:{"re":data}},{upsesrt:true,multi:true},function(err,result){
    if(err) throw err;
    res.send({
      "status": true,
      "msg": "rediscuss success!"
    })
  })
})


module.exports = router;
