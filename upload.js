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
