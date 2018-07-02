Node实现文件的上传！

一、准备

1、工程目录预览

index.js： 主文件

upload.js： 上传文件函数

static/index.html： HTML文件，编写form表单提交文件上传

public/upload：上传文件存放处

2、工程相关的包

express：Fast, unopinionated, minimalist web framework for node

formidable：A node.js module for parsing form data, especially file uploads.

二、实现

1、index.js

主文件，用express框架创建一个web服务。

var express = require('express')
var app = express()
var file = require("./upload.js")

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/fileupload', file.upload)

app.listen(3003)

express.static('static')：利用express.static中间件函数，使浏览器可以直接访问static目录下的文件。

app.post('/fileupload', file.upload)：express路由控制，配置上传文件的处理函数。

2、index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>node.js实现表单上传文件</title>
</head>
<body>
  <form action="/fileupload" method="post" enctype="multipart/form-data" onsubmit="">
    <label for="resource">
      <input type="file" id="resource" name="resource">
    </label>
    <button type="submit">提交</button>
  </form>
</body>
</html>

3、upload.js

上传处理文件

var formidable = require('formidable');
var fs = require('fs');  //node.js核心的文件处理模块

exports.upload = function(req, res, next){
  var message = '';
  var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public/upload/';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  var p = new Promise((resolve, reject) => {
    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err);
        reject(err);
      }

      var filename = files.resource.name;
      resolve({
        status: 0,
        message: "上传成功",
        data: filename
      });
    });
  });
  p.then((data) => {
    console.log('data', data);
    res.send(data);
  }).catch((err) => {
    console.log('err', err);
    res.send(err);
  })
};

formidable配置参考使用文档

Promise处理异步操作

三、测试

1、选择上传文件

2、文件上传

3、验证

public/upload目录下是否有文件

参考：

1、https://segmentfault.com/a/1190000004057022

2、http://expressjs.com/zh-cn/starter/static-files.html
